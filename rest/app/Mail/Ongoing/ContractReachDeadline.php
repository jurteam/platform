<?php

namespace App\Mail\Ongoing;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContractReachDeadline extends Mailable
{
    use Queueable, SerializesModels;

    private $party;

    private $contract;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($party, Contract $contract)
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
            ->subject('Contract about to close')
            ->markdown('emails.contracts.ongoing.reach-deadline', [
                'expirationDate' => $this->contract->getExpirationDate(),
                'url' => $this->contract->getContractUrl(),
                'contract' => $this->contract,
                'party' => $this->party
            ]);
    }
}
