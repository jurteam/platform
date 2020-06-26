<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Transaction;
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
    public function getBlock($blockNo)
    {
        // get request body
        $body = $this->getRequestConfig();

        // url to get past block events of PER service
        $url = $this->host . '/block/' . $blockNo;

        // send a POST request with configuration and get event's data
        $response = Http::post($url, $body)->throw()->json();

        // store & return transactions
        return $this->validateAndStore($response['data']);
    }

    /**
     * GET past event data based on transaction hash
     *
     * @param String $transactionHash: transaction hash
     * @return \Illuminate\Http\Response
     */
    public function getTransaction($transactionHash)
    {
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
        $from = $request->input('from', null);

        // get to Block
        $to = $request->input('to', null);

        // get direction
        $direction = $request->input('direction', 'asc');

        // throw error if there are missing params
        if ($from == null || $to == null) {
            abort(422, 'Please specify `from` and `to` blocks!');
        }

        // throw error if $from is greater than $to
        if ($from > $to) {
            abort(422, '`from` cannot be greater than `to`!');
        }

        // get request body
        $body = $this->getRequestConfig();

        // array for temporary storage
        $transactions = [];

        for ($i = $from; $i <= $to; $i++) {
            // url to get past transaction events of PER service
            $url = $this->host . '/block/' . $i;

            // send a POST request with configuration and get event's data
            $response = Http::post($url, $body)->throw()->json();

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
    private function getRequestConfig()
    {
        // get all assets
        $assets = Asset::all();

        if (sizeof($assets) == 0) {
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
            return $item['transaction']['address'];
        }, $transactions))->select('contract_address', 'transaction_hash', 'event_name')->get()->toArray();

        // store each transactions if not exists in the database
        foreach ($transactions as $item) {

            // check an item present in existing data based on  transaction_hash,contract_address and event_name
            $found = array_filter($existing, function ($data) use ($item) {
                return $data['transaction_hash'] == $item['transaction']['address'] &&
                    $data['contract_address'] == $item['contractAddress'] &&
                    $data['event_name'] == $item['eventName'];
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
