<?php

namespace App\Mail\Reward;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use \App\Models\Slot;
use \App\Models\RewardActivity;

class RewardSlotCancelled extends Mailable
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
              ->subject('Slot for the activity is cancelled')
              ->markdown('emails.rewards.slot.slot-cancelled', [
                'jur_support_email_address' => 'info@jur.io',
                'activity_name' => $this->activity->eventName
              ]);
    }
}
