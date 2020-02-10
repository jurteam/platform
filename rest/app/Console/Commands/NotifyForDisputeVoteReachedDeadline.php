<?php

namespace App\Console\Commands;

use App\Models\Contract;
use Illuminate\Console\Command;
use App\Jobs\DisputeVoteReachedDeadline;
use App\Jobs\MembersDisputeVotingClosed;

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
            $this->dispatchJobParties($disputesSet);

            $this->dispatchJobMembers($disputesSet);

            $bar->advance();
        }

        $this->info('Done!');
    }

    protected function dispatchJobParties($disputes)
    {
        $job = (new DisputeVoteReachedDeadline($disputes))->delay(60);

        dispatch($job);
    }

    protected function dispatchJobMembers($disputes)
    {
        $job = (new MembersDisputeVotingClosed($disputes))->delay(60);

        dispatch($job);
    }
}
