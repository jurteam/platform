<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Slot extends Model
{
    /**
     * Create Slot when `SlotAssigned` event triggered
     *
     * @param Object $payload: payload  send by Smart-Contract event
     * @return Boolean the success or failure message
     */
    public static function slotAssigned($payload)
    {
        // find reward_activity
        $rewardActivity = RewardActivity::where('sc_activity_id', $payload->activityId)->firstOrFail();

        // Update RewardActivity
        $slot = Slot::firstOrCreate(['sc_slot_id' => $payload->slotId, 'reward_activity_id' => $rewardActivity->id]);
        $slot->assigned_wallet = $payload->slotCount;
        $slot->reward_amount = $rewardActivity->reward_amount;
        $slot->due_date = Carbon::createFromTimestamp($payload->dueDate);
        $slot->status = 'Assigned';
        $slot->created_at = Carbon::createFromTimestamp($payload->createdAt);

        return $slot->save();
    }

    /**
     * Update Slot when `SlotUpdated` event triggered
     *
     * @param Object $payload: payload  send by Smart-Contract event
     * @return Boolean the success or failure message
     */
    public static function slotUpdated($payload)
    {
        // find reward_activity
        $rewardActivity = RewardActivity::where('sc_activity_id', $payload->activityId)->firstOrFail();

        // Update RewardActivity
        $slot = Slot::firstOrCreate(['sc_slot_id' => $payload->slotId, 'reward_activity_id' => $rewardActivity->id]);
        $slot->status = $payload->newState;

        return $slot->save();
    }
}
