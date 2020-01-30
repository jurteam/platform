<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\OngoingDispute\MemberDisputeReachDeadline;

class NotifyMembersForDisputeReachDeadline extends Job
{
    private $members;

    private $contract;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($members, $contract)
    {
        $this->members = $members;
        $this->contract = $contract;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->members as $member) {
            Mail::to($member->email)
                ->queue(new MemberDisputeReachDeadline(
                    $member, $this->contract
                ));
        }
    }
}
