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

    private $instanceId;

    /**
     * Instantiate a new RealTimeEventController instance.
     */
    public function __construct()
    {
        $this->instanceId = config('polling.RealTimeInstanceId'); // get instance id from config
    }

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
            'nextBlockNumber' => TransactionState::findLastReadBlock($this->instanceId),
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
            return $data['transaction']['address'];
        }, $block['data']))->pluck('transaction_hash')->toArray();

        foreach ($block['data'] as $transaction) {
            if (!in_array($transaction['transaction']['address'], $transactions)) {
                Transaction::store($transaction); // create new transaction if not exists
            }
        }

        // return next block number
        return ['nextBlockNumber' => TransactionState::changeLastReadBlock($this->instanceId, $block['blockNumber'])];
    }
}
