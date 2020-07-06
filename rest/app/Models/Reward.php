<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    /**
     * create Reward when `SlotRewarded` event triggered
     *
     * @param Object $payload: payload  send by Smart-Contract event
     * @return Boolean the success or failure message
     */
    public static function slotRewarded($payload)
    {
        // get data object
        $data = $payload->data;

        // Check RewardActivity record exisits
        $existingRewardActivity = RewardActivity::where('sc_activity_id', $data->activityId)->firstOrFail();

        // Check Slot exisits
        $existingSlot = Slot::where('reward_activity_id', $existingRewardActivity->id)->where('sc_slot_id', $data->slotId)->firstOrFail();

        // Check Reward exisits
        $existingReward = Reward::where('slot _id', $existingSlot->id)->first();

        // ignore creation if already exists
        if (isset($existingReward)) {
            Log::warning('The Reward with activity Id `' . $data->activityId . '` and slot Id `' . $data->slotId . '` already exists in the database.');
            return false;
        }

        // create new Reward
        $reward = new Reward;
        $reward->slot_id = $existingSlot->slot_id;
        $reward->rewardee_wallet = $existingSlot->assigned_wallet;
        $reward->reward_amount = $existingRewardActivity->reward_amount;
        $reward->rewarded_on = Carbon::createFromTimestamp($payload->timestamp);

        return $reward->save();
    }
}