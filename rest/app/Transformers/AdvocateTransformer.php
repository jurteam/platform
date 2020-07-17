<?php

namespace App\Transformers;

use App\Models\Advocate;
use League\Fractal\TransformerAbstract;

class AdvocateTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\Advocate $advocate
     * @return array
     */
    public function transform(Advocate $advocate)
    {
        return [
            'id' => $advocate->wallet,
            'type' => "advocates",
            'attributes' =>
            [
                'address' => $advocate->wallet,
                'statusType' => $advocate->type,
                'totalEarned' => $advocate->total_earned
            ]
        ];
    }

}
