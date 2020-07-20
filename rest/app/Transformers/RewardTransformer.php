<?php

namespace App\Transformers;

use App\Models\Reward;
use App\Models\RewardActivity;
use App\Models\Slot;
use Carbon\Carbon;
use League\Fractal\TransformerAbstract;

class RewardTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\Slot $slot
     * @return array
     */
    public function transform(Slot $slot)
    {
        $reward = $slot->reward;
        $rewardedOn = $reward ? Carbon::createFromDate($reward->rewarded_on)->timestamp : null;
        $rewardActivity = $slot->rewardActivity;
        $name = $rewardActivity ? $rewardActivity->name : null;
        $sc_activity_id = $rewardActivity ? $rewardActivity->sc_activity_id : null;
        

        return [
            'id' => $slot->assigned_wallet,
            'type' => "advocates",
            'attributes' =>
            [
                'slotId'=>$slot->id,
                'name' => $name,
                'rewardAmount' => $slot->reward_amount,
                'dueDate' => Carbon::createFromDate($slot->due_date)->timestamp,
                'rewardedOn' => $rewardedOn,
                'activityScId' => $sc_activity_id,
                'slotScId' => $slot->sc_slot_id
            ]
        ];
    }

}
