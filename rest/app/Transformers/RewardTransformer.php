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
     * @param  \App\Models\Reward $reward
     * @return array
     */
    public function transform(Reward $reward)
    {
        $slot = Slot::where('id', $reward->slot_id)->firstOrFail();

        $rewardActivity = RewardActivity::where('id', $slot->reward_activity_id)->firstOrFail();

        return [
            'id' => $reward->rewardee_wallet,
            'type' => "advocates",
            'attributes' =>
            [
                'name' => $rewardActivity->name,
                'rewardAmount' => $rewardActivity->reward_amount,
                'dueDate' => Carbon::createFromDate($slot->due_date)->timestamp,
                'rewardedOn' => Carbon::createFromDate($reward->rewarded_on)->timestamp,
                'activityScId' => $rewardActivity->sc_activity_id,
                'slotScId' => $slot->sc_slot_id
            ]
        ];
    }

}
