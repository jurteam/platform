<?php

namespace App\Transformers;

use App\Models\OathKeeper;
use League\Fractal\TransformerAbstract;

class OathKeeperTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\OathKeeper $OathKeeper
     * @return array
     */
    public function transform(OathKeeper $OathKeeper)
    {
        return [
            'id' => $OathKeeper->id,
            'type' => "oath-takers",
            'attributes' =>
            [
                'address' => $OathKeeper->wallet,
                'rank' => $OathKeeper->rank,
                'amount' => $OathKeeper->total_amount,
                'oathCount' => $OathKeeper->total_oath_count
            ]
        ];
    }

}
