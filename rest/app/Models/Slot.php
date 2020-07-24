<?php

namespace App\Models;

use App\Models\Reward;
use App\Models\RewardActivity;
use App\Models\RewardUnAssignedSlot;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use \App\Jobs\RewardSlotUpdateStatusToOverDue;

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
     * @return un_assigned_slots : one to many relation
     */
    public function unAssignedSlots()
    {
        return $this->hasMany(RewardUnAssignedSlot::class);
    }

    /**
     * @return RewardActivity
     */
    public function rewardActivity()
    {
        return $this->belongsTo(RewardActivity::class);
    }

    /**
     * @return Reward
     */
    public function reward()
    {
        return $this->hasOne(Reward::class);
    }

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

        // Get the time of completion
        $completeAt = Carbon::createFromTimestamp($data->dueDate);

        // find delay
        $delay = $completeAt->diffInSeconds(Carbon::now());

        $job = (new RewardSlotUpdateStatusToOverDue($slot))->delay($delay);

        dispatch($job);

        // update assigned slot count
        $rewardActivity->assigned_slots = Slot::whereNotIn('status', ['Unassigned', 'Cancelled'])
            ->where('reward_activity_id', $rewardActivity->id)->count();

        // remove if same slot marked as un-assigned for the user
        RewardUnAssignedSlot::where('slot_id', $slot->id)
            ->where('un_assigned_wallet', $slot->assigned_wallet)->delete();

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

        // find slot is already cancelled
        $alreadyCancelled = Slot::where('status', 'Cancelled')->where('sc_slot_id', $data->slotId)
            ->where('reward_activity_id', $rewardActivity->id)->count();

        // Update RewardActivity
        $slot = Slot::firstOrCreate(['sc_slot_id' => $data->slotId, 'reward_activity_id' => $rewardActivity->id]);
        $slot->status = $data->newState;

        if ($data->newState == 'Unassigned') {
            // create new entry in RewardUnAssignedSlot
            $RewardUnAssignedSlot = new RewardUnAssignedSlot;
            $RewardUnAssignedSlot->slot_id = $slot->id;
            $RewardUnAssignedSlot->un_assigned_wallet = $slot->assigned_wallet;
            $RewardUnAssignedSlot->save();

            // remove assigned_wallet from slot
            $slot->assigned_wallet = null;
        }

        $slot->save();

        if ($data->newState == 'Cancelled') {
            if ($alreadyCancelled == 0) {
                $rewardActivity->number_of_slots = $rewardActivity->number_of_slots - 1; // reduce number of slots
            }
        }

        // update assigned slot count
        $rewardActivity->assigned_slots = Slot::whereNotIn('status', ['Unassigned', 'Cancelled'])
            ->where('reward_activity_id', $rewardActivity->id)->count();

        return $rewardActivity->save();
    }
}
