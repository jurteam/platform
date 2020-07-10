<?php

namespace App\Transformers;

use App\Models\RewardActivity;
use League\Fractal\TransformerAbstract;

class RewardActivityAvailableTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\RewardActivity $rewardActivity
     * @return array
     */
    public function transform(RewardActivity $rewardActivity)
    {
        return [
            'id' => $rewardActivity->id,
            'type' => "activities",
            'attributes' =>
            [
                'name' => $rewardActivity->name,
                'rewardAmount' => $rewardActivity->reward_amount,
                'slotAssigned' => $rewardActivity->assigned_slots,
                'slotTotal' => $rewardActivity->number_of_slots
            ]
        ];
    }

}
