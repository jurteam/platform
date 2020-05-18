<?php

namespace App\Jobs;

use \App\Models\OathAnalytics;

class GenerateOathKeeperAnalytics extends Job
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
        OathAnalytics::processAnalytics();
    }
}
