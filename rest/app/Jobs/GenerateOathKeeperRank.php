<?php

namespace App\Jobs;

use \App\Models\OathKeeper;

class GenerateOathKeeperRank extends Job
{
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $rank = 0;

        $oathKeepers = OathKeeper::orderBy('active_amount', 'desc')->get();

        foreach ($oathKeepers as $oathKeeper) {
            $oathKeeper->rank = ++$rank;
            $oathKeeper->save();
        }
    }
}
