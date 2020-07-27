<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use \App\Mail\OathKeeper\OathKeeperEmailOathWithdrawn;
use \App\Models\Oath;
use \App\Models\User;

class NotifyOathWithdrawn extends Job
{

    private $oath;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Oath $oath)
    {
        $this->oath = $oath;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // get user by wallet
        $user = User::where('wallet', $this->oath->wallet)->first();

        // send a notification mail if user has updated mail id
        if (isset($user->email)) {
            Mail::to($user->email)->queue(new OathKeeperEmailOathWithdrawn($user, $this->oath));
        }
    }
}
