<?php

namespace App\Transformers;

use App\Models\RewardActivity;
use App\Models\Slot;
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
        $slotCount = Slot::where('reward_activity_id', $rewardActivity->id)->count();

        return [
            'id' => $rewardActivity->id,
            'type' => "activities",
            'attributes' =>
            [
                'name' => $rewardActivity->name,
                'rewardAmount' => $rewardActivity->reward_amount,
                'slotAssigned' => $rewardActivity->number_of_slots - $slotCount,
                'slotTotal' => $rewardActivity->number_of_slots
            ]
        ];
    }

}
