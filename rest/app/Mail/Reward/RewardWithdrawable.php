<?php

namespace App\Mail\Reward;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use \App\Models\Slot;
use \App\Models\User;

class RewardWithdrawable extends Mailable
{
    use Queueable, SerializesModels;

    private $slot;

    private $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, Slot $slot)
    {
        $this->user = $user;
        $this->slot = $slot;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject('You are now eligible to withdraw the reward!')
            ->markdown('emails.reward.withdraw', [
                'username' => isset($this->user->name) ? $this->user->name : $this->user->wallet,
                'activity_name' => $this->slot->rewardActivity->name,
                'url' => env('APP_URL') . '/advocates/' . $this->user->wallet
            ]);
    }

}
