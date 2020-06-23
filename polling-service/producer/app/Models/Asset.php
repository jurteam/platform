<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'asset_name',
        'contract_address',
        'abi',
        'default_from_block'
    ];

    protected $casts = [
        'abi' => 'array'
    ];

    public $timestamps = true;

    /**
     * Find next block number to fetch from blockchain
     *
     * @param Number $instanceId: instance Id
     * @return Number next block number
     */
    public static function findNextBlock($instanceId)
    {
        $lastBlock = TransactionStates::where('instance_id', $instanceId)->pluck('last_read_block')->first();

        if (!isset($lastBlock)) {

            $assets = Asset::all();

            $lastBlock = sizeof($assets) > 0 ? $assets[0]->default_from_block : 0;

            foreach ($assets as $asset) {
                if ($lastBlock > $asset->default_from_block) {
                    $lastBlock = $asset->default_from_block;
                }
            }
        }

        return $lastBlock;
    }
}
