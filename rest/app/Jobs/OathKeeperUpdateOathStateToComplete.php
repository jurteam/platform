<?php

namespace App\Jobs;

use \App\Jobs\OathKeeperGenerateAnalytics;
use \App\Mail\OathKeeper\OathKeeperEmailOathMatured;
use \App\Models\Oath;
use \App\Models\OathKeeper;

class OathKeeperUpdateOathStateToComplete extends Job
{

    private $wallet;

    private $oathIndex;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($wallet, $oathIndex)
    {
        $this->wallet = $wallet;
        $this->oathIndex = $oathIndex;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Find an oath based on wallet and oath-index
        $oath = Oath::where(['wallet' => $this->wallet, 'oath_index' => $this->oathIndex])->first();

        // Change current-status of the oath
        $oath->current_state = 'complete';

        // Save changes
        $saved = $oath->save();

        if ($saved) {

            // find oath-keeper
            $oathKeeper = OathKeeper::where(['wallet' => $this->wallet])->first();

            // get user by wallet
            $user = User::where('wallet', $this->wallet)->first();

            // send a notification mail if user has updated mail id
            if (isset($user->email)) {
                Mail::to($user->email)->queue(new OathKeeperEmailOathMatured($user, $oath));
            }

            // Re-Calculate summary of the oath-keeper
            OathKeeper::calculateSummary($oathKeeper);

            dispatch(new OathKeeperGenerateAnalytics);
        }
    }
}
