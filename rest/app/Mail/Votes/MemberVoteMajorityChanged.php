<?php

namespace App\Mail\Votes;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class MemberVoteMajorityChanged extends Mailable
{
    use Queueable, SerializesModels;

    private $member;

    private $contract;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($member, $contract)
    {
        $this->member = $member;
        $this->contract = $contract;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject('Majority vote has changed')
            ->markdown('emails.contracts.votes.member', [
                'url' => $this->contract->getDisputeUrl(),
                'member' => $this->member,
                'dispute' => $this->contract,
                'expirationDate' => $this->contract->getDisputeExpirationDate()
            ]);
    }
}
