<?php

namespace App\Jobs;

use \App\Models\Slot;
use \App\Models\User;
use Illuminate\Support\Facades\Mail;
use \App\Mail\RewardSlotWithdraw;

class RewardSlotUpdateStatusToCancelled extends Job
{
  private $slot;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Slot $slot)
    {
        $this->slot = $slot;
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

        // Update slot status to cancelled
        $this->slot->status = "Cancelled";

        $save = $this->slot->save();

        if($save) {
          // Get user
          $user = User::find("wallet", $this->slot->assigned_wallet)->first();

          if(isset($user->email)) {
            Mail::to($user->email)->queue(new RewardSlotWithdraw($this->slot, $this->activity));
          }
        }
    }
}
