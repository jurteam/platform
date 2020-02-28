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
    
    private $dispute;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($member, $dispute)
    {
        $this->member = $member;
        $this->dispute = $dispute;
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
            ->markdown('emails.contracts.ongoing-dispute.members', [
                'recipient' => $this->member,
                'contract' => $this->dispute,
                'url' => $this->dispute->getContractUrl(),
                'expirationDate' => $this->dispute->getDisputeExpirationDate()
            ]);
    }
}
