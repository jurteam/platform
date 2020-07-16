<?php

namespace App\Http\Controllers;

use App\Jobs\PublishTransaction;
use App\Models\Asset;
use App\Models\Consumer;
use App\Models\Transaction;
use App\Models\TransactionState;
use App\Transformers\AssetTransformer;
use Dingo\Api\Http\Response;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class RealTimeEventController extends Controller
{
    use Helpers;

    /**
     * GET configurations for polling service
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // get all assets
        $assets = Asset::all();

        if (sizeof($assets) == 0) {
            abort(404, 'No configuration found for RTR!'); // throw error if there are no configuration
        }

        $transformer = new AssetTransformer;

        // return next block number and contracts
        return [
            'nextBlockNumber' => TransactionState::findLastReadBlock(),
            'contracts' => $assets->map(function ($asset) use ($transformer) {
                return $transformer->transform($asset);
            })
        ];
    }

    /**
     * Store real-time event data
     *
     * @param Request $request: request object
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // get all json body
        $block = $request->json()->all();

        // find all transactions based on transaction id of processed block
        $transactions = Transaction::whereIn('transaction_hash', array_map(function ($data) {
            return $data['transaction_hash'];
        }, $block['data']))->pluck('transaction_hash')->toArray();

        foreach ($block['data'] as $transaction) {
            if (!in_array($transaction['transaction_hash'], $transactions)) {

                // create new transaction if not exists
                $saved = Transaction::store($transaction);

                // get all consumers of intrest
                $consumers = Consumer::where('contract_address', $transaction['contract_address'])
                    ->where('asset_name', $transaction['asset_name'])
                    ->where('event_name', $transaction['event_name'])->get();

                foreach ($consumers as $consumer) {
                    dispatch(new PublishTransaction($consumer, $saved));
                }
            }
        }

        // return next block number
        return ['nextBlockNumber' => TransactionState::changeLastReadBlock($block['block_number'])];
    }
}
