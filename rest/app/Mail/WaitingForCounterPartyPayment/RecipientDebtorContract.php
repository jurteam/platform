<?php

namespace App\Mail\WaitingForCounterPartyPayment;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RecipientDebtorContract extends Mailable
{
    use Queueable, SerializesModels;

    private $debtor;

    private $amount;

    private $contract;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $debtor, Contract $contract)
    {
        $this->debtor = $debtor;
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
            ->subject('Waiting for your payment')
            ->markdown('emails.contracts.waiting-for-counter-party-payment.debtor', [
                'url' => $this->contract->getContractUrl(),
                'debtor' => $this->debtor['name'],
                'contract' => $this->contract,
                'amount' => $this->debtor['amountToPay'],
                // 'creator' => $this->creator['name'],
                // 'recipient' => $this->recipient['name']
            ]);
    }
}
