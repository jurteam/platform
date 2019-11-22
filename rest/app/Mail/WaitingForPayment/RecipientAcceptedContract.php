<?php

namespace App\Mail\WaitingForPayment;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RecipientAcceptedContract extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
            ->markdown('emails.contracts.waiting-for-payment.creator', [
                'url' => $this->contract->getUrl(),
                'creator' => $this->creator['name'],
                'recipient' => $this->recipient['name']
            ]);
    }
}
