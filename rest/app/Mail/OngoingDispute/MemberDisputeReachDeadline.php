<?php

namespace App\Mail\OngoingDispute;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class MemberDisputeReachDeadline extends Mailable
{
    use Queueable, SerializesModels;

    private $member;

    private $contract;

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
            ->subject('Dispute about to end')
            ->markdown('emails.contracts.ongoing-dispute.deadline', [
                'url' => $this->contract->getContractUrl(),
                'member' => $this->member,
                'contract' => $this->contract,
                'expirationDate' => $this->contract->getDisputeExpirationDate()
            ]);
    }
}
