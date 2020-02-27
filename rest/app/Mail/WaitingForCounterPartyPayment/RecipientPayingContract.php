<?php

namespace App\Mail\WaitingForCounterPartyPayment;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RecipientPayingContract extends Mailable
{
    use Queueable, SerializesModels;

    private $paying;

    private $contract;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $paying, Contract $contract)
    {
        $this->paying = $paying;
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
            ->subject('Fund your contract')
            ->markdown('emails.contracts.waiting-for-counter-party-payment.paying', [
                'url' => $this->contract->getContractUrl(),
                'paying' => $this->paying['name']
                // 'creator' => $this->creator['name'],
                // 'recipient' => $this->recipient['name']
            ]);
    }
}
