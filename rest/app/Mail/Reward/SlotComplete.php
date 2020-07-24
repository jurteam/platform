<?php

namespace App\Mail\Reward;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SlotComplete extends Mailable
{
  use Queueable, SerializesModels;

  private $user;
  private $rewardActivity;

  public function __construct($user, $slot, $rewardActivity)
  {
    $this->user = $user;
    $this->rewardActivity = $rewardActivity;
  }

  public function build()
  {
    return $this
          ->subject('Due date passed. Slot can be completed')
          ->markdown('emails.rewards.slot.slot-complete', [
            'recipient' => $this->user->name || $this->user->wallet,
            'link' => env('APP_URL').'/my-advocasy/'.$this->user->wallet,
            'activity_name' => $rewardActivity->eventName
          ]);
  }

}
