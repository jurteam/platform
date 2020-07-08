<?php

namespace App\Transformers;

use App\Models\Advocate;
use App\Models\Reward;
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
        $amount = Reward::where('rewardee_wallet', $advocate->wallet)->sum('reward_amount');

        return [
            'id' => $advocate->wallet,
            'type' => "advocates",
            'attributes' =>
            [
                'address' => $advocate->wallet,
                'statusType' => $advocate->type,
                'totalEarned' => $amount
            ]
        ];
    }

}
