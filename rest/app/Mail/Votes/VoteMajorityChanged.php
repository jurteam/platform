<?php

namespace App\Mail\Votes;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class VoteMajorityChanged extends Mailable
{
    use Queueable, SerializesModels;

    private $partecipant;

    private $contract;

    /**
     * Create a new job instance.
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
            ->subject('Majority vote has changed')
            ->markdown('emails.contracts.votes.partecipant', [
                'url' => $this->contract->getDisputeUrl(),
                'partecipant' => $this->partecipant,
                'dispute' => $this->contract,
                'expirationDate' => $this->contract->getDisputeExpirationDate()
            ]);
    }
}
