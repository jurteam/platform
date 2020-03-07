<?php

namespace App\Mail\OngoingDispute;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyPartiesForVotingSession extends Mailable
{
    use Queueable, SerializesModels;

    private $party;

    private $contract;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($party, $contract)
    {
        $this->party = $party;
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
            ->subject('Dispute voting starts')
            ->markdown('emails.contracts.ongoing-dispute.counterparties', [
                'recipient' => $this->party['name'],
                'url' => $this->contract->getContractUrl(),
                'contract' => $this->contract,
                'expirationDate' => $this->contract->getDisputeExpirationDate()
            ]);
    }
}
