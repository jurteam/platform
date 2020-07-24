<?php

namespace App\Jobs;

use \App\Models\Slot;
use \App\Models\User;
use \App\Models\RewardActivity;
use \App\Mail\Reward\SlotComplete;
use Illuminate\Support\Facades\Mail;

class RewardSlotUpdateStatusToOverDue extends Job
{

    private $slot;
    private $rewardActivity;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Slot $slot, RewardActivity $rewardActivity)
    {
        $this->slot = $slot;
        $this->rewardActivity = $rewardActivity;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $sameSlot = Slot::where('id', $this->slot->id)->where('assigned_wallet', $this->slot->assigned_wallet)->first();

        if (!isset($sameSlot)) {
            return;
        }

        // Change current-status of the slot
        $this->slot->status = 'OverDue';

        // Save changes
        $saved = $this->slot->save();

        if ($saved) {
            // send a notification mail if user has updated mail id
            //TODO: send mail

            // Get user
            $user = User::where("wallet", $this->slot->assigned_wallet)->first();

            if(isset($user->email)) {
              Mail::to($user->email)->queue(new SlotComplete($user, $slot, $rewardActivity));
            }
        }
    }
}
