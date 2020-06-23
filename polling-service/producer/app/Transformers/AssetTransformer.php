<?php

namespace App\Transformers;

use App\Models\Asset;
use League\Fractal\TransformerAbstract;

class AssetTransformer extends TransformerAbstract
{
    /**
     *  Turn this item object into a generic array
     *
     * @param  \App\Models\Asset $asset
     * @param  Number $lastBlock
     * @return array
     */
    public function transform(Asset $asset)
    {
        return [
            'address' => $asset->contract_address,
            'assetName' => $asset->asset_name,
            'abi' => $asset->abi
        ];
    }

}
