<?php

namespace App\Mail\ContractClosed;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PartAcceptsClosingProposal extends Mailable
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
            ->subject('Contract successfully closed')
            ->markdown('emails.contracts.closed.creator', [
                'url' => $this->contract->getContractUrl(),
                'creator' => $this->creator['name'],
                'recipient' => $this->recipient['name'],
                'expirationDate' => $this->contract->getExpirationDate(),
                'feedbackUrl' => config('jur.feedback_url')
            ]);
    }
}
