<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use \App\Mail\Reward\RewardNewActivityAvailable;
use \App\Models\Advocate;
use \App\Models\RewardActivity;
use \App\Models\User;

class NotifyNewRewardActivityAvailable extends Job
{

    private $activity;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(RewardActivity $activity)
    {
        $this->activity = $activity;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $roleContracts = $this->activity->roleContracts;

        // availbale to all users if there are no role contracts

        // TODO: uncomment code to send all users if there are no role contracts

        // if (sizeof($roleContracts) == 0) {
        //     $users = User::get();
        //     foreach ($users as $user) {
        //         if (isset($user->email)) {
        //             // send a notification mail if user has updated mail id
        //             Mail::to($user->email)->queue(new RewardNewActivityAvailable($user, $this->activity));
        //         }
        //     }
        //     return;
        // }

        foreach ($roleContracts as $role) {

            $advocates = Advocate::where('contract_address', $role->contract_address)->get();

            foreach ($advocates as $advocate) {
                $user = User::where('wallet', $advocate->wallet)->first();

                if (!isset($user)) {
                    return;
                }

                if (isset($user->email)) {
                    // send a notification mail if user has updated mail id
                    Mail::to($user->email)->queue(new RewardNewActivityAvailable($user, $this->activity));
                }
            }
        }
    }
}
