<?php

namespace App\Jobs;

use \App\Models\Slot;
use \App\Models\User;
use Illuminate\Support\Facades\Mail;

class RewardSlotUpdateStatusToOverDueSevenDays extends Job
{

    private $slot;
    private $activity;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Slot $slot, RewardActivity $activity)
    {
        $this->slot = $slot;
        $this->activity = $activity;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $selectedSlot = Slot::where('id', $this->slot->id)->where('assigned_wallet', $this->slot->assigned_wallet)->first();

        if(!isset($selectedSlot)) {
          return;
        }

        // Update slot status
        $this->slot->status = "OverDue";

        $saved = $this->slot()->save();

        if($saved) {
          $user = User::where('wallet', $this->slot->assigned_wallet)->first();

          if(isset($user->email)) {
            Mail::to($user->email)->queue(new RewardSlotWithdraw($this->slot, $this->activity));
          }
        }
    }
}
