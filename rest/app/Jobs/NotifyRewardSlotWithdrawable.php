<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use \App\Mail\Reward\RewardWithdrawable;
use \App\Models\Slot;
use \App\Models\User;

class NotifyRewardSlotWithdrawable extends Job
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
        // check the assigned slot is still available for the user
        $slotStillAvailable = Slot::where('id', $this->slot->id)
            ->where('assigned_wallet', $this->slot->assigned_wallet)->first();

        $user = User::where('wallet', $this->slot->assigned_wallet)->first();

        if (!isset($slotStillAvailable) || !isset($user)) {
            return;
        }

        if (!($this->slot->status == 'OverDue' || $this->slot->status == 'Assigned')) {
            return;
        }

        if (isset($user->email)) {
            // send a notification mail if user has updated mail id
            Mail::to($user->email)->queue(new RewardWithdrawable($user, $this->slot));
        }
    }
}
