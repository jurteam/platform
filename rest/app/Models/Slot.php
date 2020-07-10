<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Slot extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'sc_slot_id',
        'reward_activity_id'
    ];

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

        // create/update slot for reward activity
        $slot = Slot::firstOrCreate(['sc_slot_id' => $data->slotId, 'reward_activity_id' => $rewardActivity->id]);
        $slot->assigned_wallet = $data->assignedTo;
        $slot->reward_amount = $rewardActivity->reward_amount;
        $slot->due_date = Carbon::createFromTimestamp($data->dueDate);
        $slot->status = 'Assigned';
        $slot->created_at = Carbon::createFromTimestamp($data->createdAt);
        $slot->save();

        // update assigned slot count
        $rewardActivity->assigned_slots = Slot::whereNotIn('status', ['Unassigned', 'Cancelled'])
            ->where('reward_activity_id', $rewardActivity->id)->count();

        // return status
        return $rewardActivity->save();
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

        if ($data->newState == 'Unassigned') {
            $slot->assigned_wallet = null;
        }

        if ($data->newState == 'Cancelled') {
            // reduce number of slots
            $rewardActivity->number_of_slots = $rewardActivity->number_of_slots > 0 ? $rewardActivity->number_of_slots - 1 : 0;
        }

        $slot->save();

        // update assigned slot count
        $rewardActivity->assigned_slots = Slot::whereNotIn('status', ['Unassigned', 'Cancelled'])
            ->where('reward_activity_id', $rewardActivity->id)->count();

        return $rewardActivity->save();
    }
}
