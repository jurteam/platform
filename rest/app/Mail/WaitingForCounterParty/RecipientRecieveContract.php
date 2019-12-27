<?php

namespace App\Mail\WaitingForCounterParty;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RecipientRecieveContract extends Mailable
{
    use Queueable, SerializesModels;

    private $creator;

    private $recipient;

    private $contract;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $creator, array $recipient, Contract $contract)
    {
        $this->creator = $creator;
        $this->recipient = $recipient;
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
            ->subject('You received a new contract')
            ->markdown('emails.contracts.waiting-for-counter-party.recipient', [
                'url' => $this->contract->getContractUrl(),
                'creator' => $this->creator['name'],
                'recipient' => $this->recipient['name']
            ]);
    }
}
