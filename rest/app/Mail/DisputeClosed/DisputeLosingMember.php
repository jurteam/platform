<?php

namespace App\Mail\DisputeClosed;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class DisputeLosingMember extends Mailable
{
    use Queueable, SerializesModels;

    private $member;

    private $contract;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($member, $contract)
    {
        $this->member = $member;
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
            ->subject('You have lost the dispute')
            ->markdown('emails.contracts.dispute-closed.members.loser', [
                'member' => $this->member->getPublicName(),
                'contract' => $this->contract,
                'url' => $this->contract->getContractUrl()
            ]);
    }
}
