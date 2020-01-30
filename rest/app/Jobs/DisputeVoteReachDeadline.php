<?php

namespace App\Jobs;

use App\Jobs\NotifyMembersForDisputeReachDeadline;
use App\Jobs\NotifyPartecipantsForDisputeReachDeadline;

class DisputeVoteReachDeadline extends Job
{
    private $contract;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($contract)
    {
        $this->contract = $contract;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $partecipants = $this->contract->getPartecipants()->chunk(20);
        $members = $this->contract->getMembers()->chunk(20);

        $partecipants->each(function($partecipantsSet) {
            $job = (new NotifyPartecipantsForDisputeReachDeadline(
                $partecipantsSet, $this->contract
            ))->delay(60);

            dispatch($job);
        });

        $members->each(function($membersSet) {
            $job = (new NotifyMembersForDisputeReachDeadline(
                $membersSet, $this->contract
            ))->delay(60);

            dispatch($job);
        });
    }
}
