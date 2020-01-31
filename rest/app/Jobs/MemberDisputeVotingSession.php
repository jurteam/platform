<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\OngoingDispute\NotifyMembersForVotingSession;

class MemberDisputeVotingSession extends Job
{
    private $members;

    private $disputes;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($members, $disputes)
    {
        $this->members = $members;
        $this->disputes = $disputes;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->disputes as $dispute) {
            foreach ($this->members as $member) {
                Mail::to($member->email)
                    ->queue(new NotifyMembersForVotingSession($member, $dispute));
            }
        }
    }
}
