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
        // get data object
        $data = $payload->data;

        // find reward_activity
        $rewardActivity = RewardActivity::where('sc_activity_id', $data->activityId)->firstOrFail();

        // Update RewardActivity
        $slot = Slot::firstOrCreate(['sc_slot_id' => $data->slotId, 'reward_activity_id' => $rewardActivity->id]);
        $slot->assigned_wallet = $data->slotCount;
        $slot->reward_amount = $rewardActivity->reward_amount;
        $slot->due_date = Carbon::createFromTimestamp($data->dueDate);
        $slot->status = 'Assigned';
        $slot->created_at = Carbon::createFromTimestamp($data->createdAt);

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
        // get data object
        $data = $payload->data;

        // find reward_activity
        $rewardActivity = RewardActivity::where('sc_activity_id', $data->activityId)->firstOrFail();

        // Update RewardActivity
        $slot = Slot::firstOrCreate(['sc_slot_id' => $data->slotId, 'reward_activity_id' => $rewardActivity->id]);
        $slot->status = $data->newState;

        return $slot->save();
    }
}
