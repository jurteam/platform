<?php

namespace App\Mail\Reward;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RewardSlotWithdraw extends Mailable
{
    use Queueable, SerializesModels;

    private $slot;
    private $activity;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Slot $slot, RewardActivity $activity)
    {
        $this->slot = $slot;
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
              ->subject('You can withdraw you reward')
              ->markdown('emails.rewards.slot.slot-withdraw', [
                'activity_name' => $activity->eventName,
                'link_to_advocacy_page' => env('APP_URL').'/my-advocasy/'.$this->slot->assigned_wallet
              ]);
    }
}
