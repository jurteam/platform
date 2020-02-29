<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\OngoingDispute\NotifyMembersForVotingSession;

class MemberDisputeVotingSession extends Job
{

    private $disputes;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($disputes)
    {
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

            $members = User::exceptFromContracts(
                collect([$dispute->part_a_wallet, $dispute->part_b_wallet])
            )->get();

            foreach ($members as $member) 
            {
                if ($member->email && $member->accepted_terms)
                {
                    $memberName = $member->name ?: $member->wallet;
                    
                    Mail::to($member->email)
                        ->queue(new NotifyMembersForVotingSession($memberName, $dispute));
                }
            }
        }
    }
}
