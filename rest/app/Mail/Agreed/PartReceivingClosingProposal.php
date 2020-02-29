<?php

namespace App\Mail\Agreed;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PartReceivingClosingProposal extends Mailable
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
            ->subject('Successful closing proposal')
            ->markdown('emails.contracts.agreed.creator', [
                'contract' => $this->contract,
                'url' => $this->contract->getContractUrl(),
                'creator' => $this->creator['name'],
                'recipient' => $this->recipient['name'],
                'expirationDate' => $this->contract->getExpirationDate()
            ]);
    }
}
