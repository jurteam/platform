<?php

namespace App\Mail\OpenDispute;

use App\Models\Activity;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RecipientReceiveRejectResolution extends Mailable
{
    use Queueable, SerializesModels;

    private $recipient;

    private $activity;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $creator, $recipient, Activity $activity)
    {
        $this->creator = $creator;
        $this->recipient = $recipient;
        $this->activity = $activity;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject('Dispute opened')
            ->markdown('emails.contracts.open-dispute.recipient', [
                'url' => $this->contract->getContractUrl(),
                'expirationDate' => $this->contract->getExpirationDate(),
                'contract' => $this->contract,
                'creator' => $this->creator['name'],
                'recipient' => $this->recipient['name']
            ]);
    }
}
