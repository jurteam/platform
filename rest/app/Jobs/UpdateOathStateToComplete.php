<?php

namespace App\Jobs;

use \App\Jobs\GenerateOathKeeperRank;
use \App\Models\GenerateOathKeeperAnalytics;
use \App\Models\Oath;
use \App\Models\OathKeeper;

class UpdateOathStateToComplete extends Job
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

            // Re-Calculate summary of the oath-keeper
            OathKeeper::calculateSummary($oathKeeper);

            // Re-Generate Rank
            dispatch(new GenerateOathKeeperRank);
            dispatch(new GenerateOathKeeperAnalytics);
        }
    }
}
