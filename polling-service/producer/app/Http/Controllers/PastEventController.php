<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Transaction;
use App\Models\TransactionState;
use App\Transformers\AssetTransformer;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PastEventController extends Controller
{
    use Helpers;

    /**
     * Host of PER service.
     */
    private $host;

    /**
     * Instantiate a new PastEventController instance.
     */
    public function __construct()
    {
        // get host info from config
        $this->host = config('polling.PERHost');
    }

    /**
     * GET past event data based on block number
     *
     * @param Number $blockNo: block number
     * @return \Illuminate\Http\Response
     */
    public function getBlock(Request $request, $blockNo)
    {
        // get polling type
        $fetchFromBlockchain = $request->input('blockchain', false);

        // when no need of blockchain polling
        if (!$fetchFromBlockchain) {
            $transactions = Transaction::where('block_number', $blockNo)->orderBy('block_number')->get()->toArray();
            return ['transactions' => $transactions];
        }

        // get request body
        $body = $this->getRequestConfig();

        // url to get past block events of PER service
        $url = $this->host . '/blocks/' . $blockNo;

        // send a POST request with configuration and get event's data
        $response = Http::post($url, $body)->throw()->json();

        // store & return transactions
        return $this->validateAndStore($response['data']);
    }

    /**
     * GET past event data based on asset name
     *
     * @param Number $assetName: asset name
     * @return \Illuminate\Http\Response
     */
    public function getAsset(Request $request, $assetName)
    {
        // get polling type
        $fetchFromBlockchain = $request->input('blockchain', false);

        // when no need of blockchain polling
        if (!$fetchFromBlockchain) {
            $transactions = Transaction::where('asset_name', $assetName)->orderBy('block_number')->get()->toArray();
            return ['transactions' => $transactions];
        }

        // get request body
        $config = $this->getRequestConfig(['asset_name', $assetName]);

        $from = TransactionState::findInitialBlock($assetName);

        $to = TransactionState::first()->last_read_block;

        if (!isset($to)) {
            abort(422, 'Please set last_read_block in TransactionState');
        }

        // loop through all blocks related to $assetName
        return $this->loopBlocks($from, $to, $config);
    }

    /**
     * GET past event data based on contract address
     *
     * @param Number $contractAddress: contract address
     * @return \Illuminate\Http\Response
     */
    public function getContract(Request $request, $contractAddress)
    {
        // get polling type
        $fetchFromBlockchain = $request->input('blockchain', false);

        // when no need of blockchain polling
        if (!$fetchFromBlockchain) {
            $transactions = Transaction::where('contract_address', $contractAddress)->orderBy('block_number')->get()->toArray();
            return ['transactions' => $transactions];
        }

        // get request body
        $config = $this->getRequestConfig(['contract_address', $contractAddress]);

        $from = Asset::where('contract_address', $contractAddress)->first()->default_block_number;

        $to = TransactionState::first()->last_read_block;

        if (!isset($to)) {
            abort(422, 'Please set last_read_block in TransactionState');
        }

        // loop through all blocks related to $assetName
        return $this->loopBlocks($from, $to, $config);
    }

    /**
     * GET past event data based on transaction hash
     *
     * @param String $transactionHash: transaction hash
     * @return \Illuminate\Http\Response
     */
    public function getTransaction(Request $request, $transactionHash)
    {
        // get polling type
        $fetchFromBlockchain = $request->input('blockchain', false);

        // when no need of blockchain polling
        if (!$fetchFromBlockchain) {
            $transactions = Transaction::where('transaction_hash', $transactionHash)->orderBy('block_number')->get()->toArray();
            return ['transactions' => $transactions];
        }

        // get request body
        $body = $this->getRequestConfig();

        // url to get past transaction events of PER service
        $url = $this->host . '/tx/' . $transactionHash;

        // send a POST request with configuration and get event's data
        $response = Http::post($url, $body)->throw()->json();

        // store & return transactions
        return $this->validateAndStore($response['data']);
    }

    /**
     * GET mutiple blocks of past event data
     *
     * @return \Illuminate\Http\Response
     */
    public function getBlocks(Request $request)
    {
        // get from Block
        $from = $request->input('from', TransactionState::findInitialBlock());

        // get to Block
        $to = $request->input('to', TransactionState::findLastReadBlock());

        // throw error if $from is greater than $to
        if ($from > $to) {
            abort(422, '`from` cannot be greater than `to`!');
        }

        // get polling type
        $fetchFromBlockchain = $request->input('blockchain', false);

        // when no need of blockchain polling
        if (!$fetchFromBlockchain) {
            $transactions = Transaction::where('block_number', '>=', $from)
                ->where('block_number', '<=', $to)->orderBy('block_number')->get()->toArray();
            return ['transactions' => $transactions];
        }

        // get request body
        $config = $this->getRequestConfig();

        return $this->loopBlocks($from, $to, $config);
    }

    /**
     * get all blocks based on block numbers
     *
     * @return Object : configuration of contracts
     */
    private function loopBlocks($from, $to, $config)
    {
        // array for temporary storage
        $transactions = [];

        for ($i = $from; $i <= $to; $i++) {
            // url to get past transaction events of PER service
            $url = $this->host . '/blocks/' . $i;

            // send a POST request with configuration and get event's data
            $response = Http::post($url, $config)->throw()->json();

            // push to array for later-processing
            foreach ($response['data'] as $data) {
                array_push($transactions, $data);
            }
        }

        // store & return transactions
        return $this->validateAndStore($transactions);

    }

    /**
     * find configurations for past event polling service
     *
     * @return Object : configuration of contracts
     */
    private function getRequestConfig($filter = null)
    {
        $assets = null;

        if ($filter == null) {
            $assets = Asset::all(); // get all assets
        } else {
            $assets = Asset::where($filter[0], $filter[1])->get(); // get filtered assets
        }

        if ($assets == null) {
            abort(404, 'No configuration found for PER!'); // throw error if there are no configuration
        }

        // new instance of asset transformer
        $transformer = new AssetTransformer;

        // return configuration of contracts
        return [
            'contracts' => $assets->map(function ($asset) use ($transformer) {
                return $transformer->transform($asset);
            })
        ];
    }

    /**
     * store valid transactions if not exists in the database
     *
     * @param Array $transactions : array of transactions
     * @return Array : all transactions found
     */
    private function validateAndStore($transactions)
    {
        // find all transactions based on transaction id
        $existing = Transaction::whereIn('transaction_hash', array_map(function ($item) {
            return $item['transaction_hash'];
        }, $transactions))->select('contract_address', 'transaction_hash', 'event_name')->get()->toArray();

        // store each transactions if not exists in the database
        foreach ($transactions as $item) {

            // check an item present in existing data based on  transaction_hash,contract_address and event_name
            $found = array_filter($existing, function ($data) use ($item) {
                return $data['transaction_hash'] == $item['transaction_hash'] &&
                    $data['contract_address'] == $item['contract_address'] &&
                    $data['event_name'] == $item['event_name'];
            });

            // create new transaction if not exists
            if (!$found) {
                Transaction::store($item);
            }
        }

        // return all transactions
        return ['transactions' => $transactions];
    }
}
