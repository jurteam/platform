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
     * @return Number last read block number
     */
    public static function findLastReadBlock()
    {
        // find last read block from TransactionState
        $lastBlock = TransactionState::pluck('last_read_block')->first();

        // if TransactionState is not contain the specific instance
        if (!isset($lastBlock)) {

            // find the lowest block to read
            $assets = Asset::all();

            // get initial block
            $lastBlock = TransactionState::findInitialBlock();

            // create new TransactionState
            $state = new TransactionState;
            $state->last_read_block = $lastBlock;
            $state->save();
        }

        // retun last block
        return $lastBlock;
    }

    /**
     * Find fist block number of all assets
     *
     * @return Number last read block number
     */
    public static function findInitialBlock($assetName = null)
    {
        // find the lowest block to read
        $assets;

        if ($assetName == null) {
            $assets = Asset::all();
        } else {
            $assets = Asset::where('asset_name', $assetName)->get();
        }

        $lastBlock = sizeof($assets) > 0 ? $assets[0]->default_from_block : 0;

        foreach ($assets as $asset) {
            if ($lastBlock > $asset->default_from_block) {
                $lastBlock = $asset->default_from_block;
            }
        }

        // retun last block
        return $lastBlock;
    }

    /**
     * Change last read block of a transactionState
     *
     * @param Number $blockNo: block number
     * @return Number next block number
     */
    public static function changeLastReadBlock($blockNo)
    {
        // find the TransactionState
        $state = TransactionState::first();

        // change last read block if  TransactionState exists
        if (isset($state)) {
            $state->last_read_block = $blockNo;
            $state->save();
        }

        // return next block number
        return $blockNo + 1;
    }
}
