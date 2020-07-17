<?php

namespace App\Mail\Ongoing;

use App\Models\Activity;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContractOngoing extends Mailable
{
    use Queueable, SerializesModels;

    private $creator;

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
            ->subject('Your contract has started')
            ->markdown('emails.contracts.ongoing.recipient', [
                'url' => $this->activity->contract->getContractUrl(),
                'creator' => $this->creator['name'],
                'recipient' => $this->recipient['name'],
                'expirationDate' => $this->activity->contract->getExpirationDate()
            ]);
    }
}
