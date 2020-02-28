<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\Votes\MemberVoteMajorityChanged;

class NotifyMembersForMajorityChange extends Job
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
            if ($member->email && $member->accepted_terms) 
            {
                info('------- member ----- '.$member->email.' -- ');
                Mail::to($member->email)
                    ->queue(new MemberVoteMajorityChanged($member, $this->contract));
            }
        }
    }
}
