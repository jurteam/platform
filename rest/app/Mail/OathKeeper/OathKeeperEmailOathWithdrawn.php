<?php

namespace App\Mail\OathKeeper;

use App\Models\Oath;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OathKeeperEmailOathWithdrawn extends Mailable
{
    use Queueable, SerializesModels;

    private $oath;

    private $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, Oath $oath)
    {
        $this->user = $user;
        $this->oath = $oath;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $start_at = Carbon::createFromDate($this->oath->start_at)->format('l jS \\of F Y h:i A - T');
        $amount = number_format((float) $this->oath->amount, 2, '.', '');

        return $this
            ->subject('Your oath worth ' . $amount . ' JUR taken on ' . $start_at . '  has been successfully withdrawn.')
            ->markdown('emails.oath-keeper.withdrawn', [
                'username' => isset($this->user->name) ? $this->user->name : $this->user->wallet,
                'amount' => $amount,
                'start_at' => $start_at
            ]);
    }
}
