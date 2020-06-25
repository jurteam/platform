<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionState extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'instance_id',
        'service_name',
        'last_read_block'
    ];

    public $timestamps = true;

    /**
     * Find last read block number
     *
     * @param Number $instanceId: instance Id
     * @return Number last read block number
     */
    public static function findLastReadBlock($instanceId)
    {
        // find last read block from TransactionState
        $lastBlock = TransactionState::where('instance_id', $instanceId)->pluck('last_read_block')->first();

        // if TransactionState is not contain the specific instance
        if (!isset($lastBlock)) {

            // find the lowest block to read
            $assets = Asset::all();

            $lastBlock = sizeof($assets) > 0 ? $assets[0]->default_from_block : 0;

            foreach ($assets as $asset) {
                if ($lastBlock > $asset->default_from_block) {
                    $lastBlock = $asset->default_from_block;
                }
            }

            // create new TransactionState
            $state = new TransactionState;
            $state->instance_id = $instanceId;
            $state->service_name = $instanceId == config('polling.RealTimeInstanceId') ? 'RTR' : 'PER';
            $state->last_read_block = $lastBlock;
            $state->save();
        }

        // retun last block
        return $lastBlock;
    }

    /**
     * Change last read block of a transactionState
     *
     * @param Number $instanceId: instance Id
     * @param Number $blockNo: block number
     * @return Number next block number
     */
    public static function changeLastReadBlock($instanceId, $blockNo)
    {
        // find the TransactionState by $instanceId
        $state = TransactionState::where('instance_id', $instanceId)->first();

        // change last read block if  TransactionState exists
        if (isset($state)) {
            $state->last_read_block = $blockNo;
            $state->save();
        }

        // return next block number
        return $blockNo + 1;
    }
}
