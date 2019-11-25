<?php

namespace App\Mail\WaitingForCounterParty;

use App\Models\Activity;
use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreatorSentContract extends Mailable
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
            ->subject('Contract successfully sent')
            ->markdown('emails.contracts.waiting-for-counter-party.creator', [
                'url' => $this->contract->getContractUrl(),
                'creator' => $this->creator['name'],
                'recipient' => $this->recipient['name']
            ]);
    }
}
