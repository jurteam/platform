<?php

namespace App\Mail\FriendlyResolution;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RecipientRecieveFriendlyResolution extends Mailable
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
            ->subject('Friendly resolution received')
            ->markdown('emails.contracts.friendly-resolution.recipient', [
                'url' => $this->contract->getContractUrl(),
                'creator' => $this->creator['name'],
                'recipient' => $this->recipient['name'],
                'expirationDate' => $this->contract->getExpirationDate()
            ]);
    }
}
