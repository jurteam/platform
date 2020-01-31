<?php

namespace App\Console\Commands;

use App\Models\Contract;
use Illuminate\Console\Command;
use App\Jobs\DisputeVoteReachDeadline;

class NotifyForDisputeVoteDeadline extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jur:dispute-deadline';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send email notification to parties involved and Jur member about dispute vote deadline';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $disputes = Contract::disputeDeadline()->chunk(20);

        $bar = $this->output->createProgressBar($disputes->count());

        foreach ($disputes as $disputesSet) {
            $job = (new DisputeVoteReachDeadline($disputesSet))->delay(60);

            dispatch($job);

            $bar->advance();
        }

        $this->info('Done!');
    }
}
