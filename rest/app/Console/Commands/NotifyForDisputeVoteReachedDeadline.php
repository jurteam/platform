<?php

namespace App\Console\Commands;

use App\Models\Contract;
use Illuminate\Console\Command;
use App\Jobs\DisputeVoteReachedDeadline;

class NotifyForDisputeVoteReachedDeadline extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jur:dispute-closed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notify parties for the ending of the dispute (Winner, Loser)';

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
        $disputes = Contract::disputeDeadline(true)->chunk(20);

        $bar = $this->output->createProgressBar($disputes->count());

        foreach ($disputes as $disputesSet) {
            $job = (new DisputeVoteReachedDeadline($disputesSet))->delay(60);

            dispatch($job);

            $bar->advance();
        }

        $this->info('Done!');
    }
}
