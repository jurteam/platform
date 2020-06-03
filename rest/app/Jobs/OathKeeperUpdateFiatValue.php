<?php

namespace App\Jobs;

use \App\Models\Oath;
use \App\Models\OathKeeper;
use \Carbon\Carbon;

class OathKeeperUpdateFiatValue extends Job
{
    private $oath;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($oath)
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
        // Get fiat value of JUR/VET
        $JurVet = json_decode(file_get_contents('https://api.oceanex.pro/v1/tickers/jurvet'), true);
        $ticker = $JurVet['data']['ticker'];

        // Find Average of fiat value
        $lowFiatValue = $ticker['low'];
        $highFiatValue = $ticker['high'];
        $averageFiatValue = ($lowFiatValue + $highFiatValue) / 2;

        
        $this->oath->fiat_value = $averageFiatValue;

        $this->oath->save();
    }
}
