<?php

namespace App\Mail\OngoingDispute;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyMembersForVotingSession extends Mailable
{
    use Queueable, SerializesModels;

    private $member;

    /**
     * Create a new message instance.
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
            ->subject('A new dispute has been opened')
            ->markdown('emails.contract.ongoing-dispute.members', [
                'recipient' => $this->member,
                'contract' => $this->contract,
                'url' => $this->contract->getContractUrl(),
                'expirationDate' => $this->contract->getDisputeExpirationDate()
            ]);
    }
}
