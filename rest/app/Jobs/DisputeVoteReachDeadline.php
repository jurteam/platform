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
    public function __construct($contracts)
    {
        $this->contracts = $contracts;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->contracts as $contract) {
            $partecipants = $contract->getPartecipants()->chunk(20);
            $members = $contract->getMembers()->chunk(20);

            $partecipants->each(function($partecipantsSet) use($contract) {
                $job = (new NotifyPartecipantsForDisputeReachDeadline(
                    $partecipantsSet, $contract
                ))->delay(60);

                dispatch($job);
            });

            $members->each(function($membersSet) use($contract) {
                $job = (new NotifyMembersForDisputeReachDeadline(
                    $membersSet, $contract
                ))->delay(60);

                dispatch($job);
            });
        }
    }
}
