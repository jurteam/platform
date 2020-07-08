<?php

namespace App\Transformers;

use App\Models\RewardActivity;
use App\Models\Slot;
use Carbon\Carbon;
use League\Fractal\TransformerAbstract;

class SlotOnGoingTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\Slot $slot
     * @return array
     */
    public function transform(Slot $slot)
    {
        $rewardActivity = RewardActivity::where('id', $slot->reward_activity_id)->firstOrFail();

        return [
            'id' => $slot->id,
            'type' => "activities",
            'attributes' =>
            [
                'name' => $rewardActivity->name,
                'rewardAmount' => $rewardActivity->reward_amount,
                'dueDate' => Carbon::createFromDate($slot->due_date)->timestamp,
                'state' => $slot->status,
                'activityScId' => $rewardActivity->sc_activity_id,
                'slotScId' => $slot->sc_slot_id
            ]
        ];
    }

}
