<?php

namespace App\Jobs;

use \App\Models\Oath;
use \App\Models\OathKeeper;
use \Carbon\Carbon;

class GenerateOathKeeperRank extends Job
{
    private $oathKeeper;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($oathKeeper)
    {
        $this->oathKeeper = $oathKeeper;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $oaths = Oath::where(['oath_keeper_id' => $this->oathKeeper->id])->orderBy('oath_index', 'asc')->get();

        $pastOaths = [];

        $rankPoint = 0;

        foreach ($oaths as $oath) {

            // find the basic point
            $basicPoint = $oath->amount * pow($oath->lock_in_period, config('rank.basicMultiplier'));

            // find the fiat point
            $fiatPoint = config('rank.fiatMultiplier') * (config('rank.fiatReference') / $oath->fiat_value) * $basicPoint;

            $sumHistory = 0;
            $currentTimeStamp = Carbon::createFromDate($oath->start_at)->timestamp;
            foreach ($pastOaths as $past) {
                $prevTimeStamp = Carbon::createFromDate($past->start_at)->timestamp;
                $sumHistory = $sumHistory + (($basicPoint + $fiatPoint) * pow(abs($currentTimeStamp - $prevTimeStamp), config('rank.oldnessMultiplier')));
            }

            // find the history point
            $historyPoint = config('rank.historyMultiplier') * $sumHistory;

            // find the bonus point
            $bonusPoint = (5/100) * (1- M_2_PI * atan( config('rank.bonusMultiplier') * ($currentTimeStamp-config('rank.timestampReference'))/config('rank.timestampReference')))* $basicPoint;
            
            // calculate rank point
            $rankPoint = $rankPoint + $basicPoint + $fiatPoint + $historyPoint+ $bonusPoint;

            // add oath to past oaths
            array_push($pastOaths, $oath);
        }

        $this->oathKeeper->rank_point = $rankPoint;

        $this->oathKeeper->save();

        $rank = 0;

        $oathKeepers = OathKeeper::orderBy('rank_point', 'desc')->get();

        foreach ($oathKeepers as $oathKeeper) {
            $oathKeeper->rank = ++$rank;
            $oathKeeper->save();
        }
    }
}
