<?php

namespace App\Mail\Rewards;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SlotComplete extends Mailable
{
  use Queueable, SerializesModels;

  private $recipient;
  private $rewardActivity;

  public function __construct($recipient, $slot, $rewardActivity)
  {
    $this->recipient = $recipient;
    $this->rewardActivity = $rewardActivity;
  }

  public function build()
  {
    return $this
          ->subject('Due date passed. Slot can be completed')
          ->markdown('emails.advocates.slot.slot-complete', [
            'recipient' => $this->recipient->name,
            'link' => env('APP_URL').'/my-advocasy/'.$this->recipient->wallet,
            'activity_name' => $rewardActivity->eventName
          ]);
  }

}
