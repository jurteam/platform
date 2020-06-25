<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Transaction;
use App\Models\TransactionState;
use App\Transformers\AssetTransformer;
use Dingo\Api\Http\Response;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class RealTimeEventController extends Controller
{
    use Helpers;

    private $instanceId = 0;

    /**
     * GET configurations for polling service
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $assets = Asset::all();

        if (sizeof($assets) == 0) {
            abort(404, 'No configuration found for RTR!');
        }

        $transformer = new AssetTransformer;

        return [
            'nextBlockNumber' => TransactionState::findLastReadBlock($this->instanceId),
            'contracts' => $assets->map(function ($asset) use ($transformer) {
                return $transformer->transform($asset);
            })
        ];
    }

    /**
     * Store real-time event data
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $block = $request->json()->all();

        $transactions = Transaction::whereIn('transaction_hash', array_map(function ($data) {
            return $data['transaction']['address'];
        }, $block['data']))->pluck('transaction_hash')->toArray();

        foreach ($block['data'] as $transaction) {
            if (!in_array($transaction['transaction']['address'], $transactions)) {
                Transaction::store($transaction);
            }
        }

        return ['nextBlockNumber' => TransactionState::changeLastReadBlock($this->instanceId, $block['blockNumber'])];
    }
}
