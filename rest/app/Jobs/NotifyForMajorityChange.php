<?php

namespace App\Jobs;

use App\Models\Contract;
use App\Jobs\NotifyMembersForMajorityChange;
use App\Jobs\NotifyPartecipantsForMajorityChange;

class NotifyForMajorityChange extends Job
{
    private $contract;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Contract $contract)
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
            $job = (new NotifyPartecipantsForMajorityChange(
                $partecipantsSet,
                $this->contract
            ))->delay(60);

            dispatch($job);
        });

        $members->each(function($membersSet) {
            $job = (new NotifyMembersForMajorityChange(
                $membersSet,
                $this->contract
            ))->delay(60);

            dispatch($job);
        });
    }
}
