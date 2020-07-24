<?php

namespace App\Mail\OathKeeper;

use App\Models\Oath;
use App\Models\User;
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
        return $this
            ->subject('Your oath worth ' . $this->oath->amount . ' JUR taken on ' . $this->oath->start_at . '  has been successfully withdrawn.')
            ->markdown('emails.oath-keeper.withdrawn', [
                'username' => isset($this->user->name) ? $this->user->name : $this->user->wallet,
                'oath' => $this->oath
            ]);
    }
}
