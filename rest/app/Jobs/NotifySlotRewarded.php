<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use \App\Mail\Reward\RewardSlotRewarded;
use \App\Models\Slot;
use \App\Models\User;

class NotifySlotRewarded extends Job
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
        $user = User::where('wallet', $this->slot->assigned_wallet)->first();

        if (!isset($user)) {
            return;
        }

        if (isset($user->email)) {
            // send a notification mail if user has updated mail id
            Mail::to($user->email)->queue(new RewardSlotRewarded($user, $this->slot));
        }
    }
}
