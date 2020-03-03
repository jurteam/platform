<?php

namespace App\Mail\DisputeClosed;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class DisputeLosingPart extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($contract)
    {
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
            ->markdown('emails.contracts.dispute-closed.loser', [
                'winner' => $this->contract->getWinner(),
                'loser' => $this->contract->getLoser(),
                'dispute' => $this->contract,
                'feedbackUrl' => config('jur.feedback_url')
            ]);
    }
}
