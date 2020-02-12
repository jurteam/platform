<?php

namespace App\Mail\Disputes;

use App\Models\Withdrawal;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Withdraw extends Mailable
{
    use Queueable, SerializesModels;

    private $withdrawal;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Withdrawal $withdrawal)
    {
        $this->withdrawal = $withdrawal;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject('Your resolution has been credited')
            ->markdown('emails.contracts.disputes.withdraw', [
                'withdrawal' => $this->withdrawal,
                'user' => $this->withdrawal->getUserFromWallet()
            ]);
    }
}
