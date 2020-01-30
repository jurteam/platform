<?php

namespace App\Mail\OngoingDispute;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PartyDisputeReachDeadline extends Mailable
{
    use Queueable, SerializesModels;

    private $partecipant;

    private $contract;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($partecipant, $contract)
    {
        $this->partecipant = $partecipant;
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
            ->markdown('emails.contracts.ongoing-dispute.party-deadline', [
                'url' => $this->contract->getContractUrl(),
                'partecipant' => $this->partecipant,
                'contract' => $this->contract,
                'expirationDate' => $this->contract->getDisputeExpirationDate()
            ]);
    }
}
