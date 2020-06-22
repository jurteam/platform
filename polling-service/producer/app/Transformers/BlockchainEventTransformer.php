<?php

namespace App\Transformers;

use App\Models\Asset;
use App\Models\TransactionStates;
use League\Fractal\TransformerAbstract;

class BlockchainEventTransformer extends TransformerAbstract
{
    protected $serviceName;

    /**
     * Create a new instance.
     *~
     * @return void
     */
    public function __construct($serviceName)
    {
        $this->serviceName = $serviceName;
    }

    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\Asset $asset
     * @param  Number $lastBlock
     * @return array
     */
    public function transform(Asset $asset)
    {
        $lastBlock = TransactionStates::where('service_name', $this->serviceName)->pluck('last_read_block')->first();

        return [
            'nextBlockNumber' => isset($lastBlock) ? $lastBlock + 1 : $asset->default_from_block,
            'contracts' => [
                [
                    'contract_address' => $asset->contract_address,
                    'asset_name' => $asset->asset_name,
                    'event_abi' => $asset->event_abi
                ]
            ]
        ];
    }

}
