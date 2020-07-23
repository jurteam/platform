<?php

namespace App\Mail\OathKeeper;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OathKeeperEmailOathMatured extends Mailable
{
    use Queueable, SerializesModels;

    private $oath;

    private $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $oath)
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
            ->subject('You can now withdraw you oath worth ' . $this->oath->amount . ' JUR taken on ' . $this->oath->start_at . '.')
            ->markdown('emails.oath-keeper.fulfilled', [
                'username' => isset($this->user->name) ? $this->user->name : $this->user->wallet,
                'oath' => $this->oath,
                'withdrawUrl' => env('APP_URL') . '/profile/my-oaths'
            ]);
    }
}
