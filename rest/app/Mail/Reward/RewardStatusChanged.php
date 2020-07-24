<?php

namespace App\Mail\Reward;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use \App\Models\Slot;
use \App\Models\User;

class RewardStatusChanged extends Mailable
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
            ->subject('The activity slot got ' . $this->slot->status)
            ->markdown('emails.reward.status-changed', [
                'username' => isset($this->user->name) ? $this->user->name : $this->user->wallet,
                'activity_name' => $this->slot->rewardActivity->name,
                'status' => $this->slot->status
            ]);
    }

}
