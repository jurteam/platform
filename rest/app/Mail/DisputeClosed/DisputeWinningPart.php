<?php

namespace App\Mail\DisputeClosed;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class DisputeWinningPart extends Mailable
{
    use Queueable, SerializesModels;

    private $contract;

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
            ->subject('You have won the dispute')
            ->markdown('emails.contracts.dispute-closed.winner', [
                'winner' => $this->contract->getWinner(),
                'loser' => $this->contract->getLoser(),
                'dispute' => $this->contract,
                'url' => $this->contract->getContractUrl(),
                'feedbackUrl' => config('jur.feedback_url')
            ]);
    }
}
