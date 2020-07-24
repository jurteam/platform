<?php

namespace App\Jobs;

use App\Models\Slot;
use App\Models\User;
use App\Models\RewardActivity;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Email\Advocate\SlotComplete;


class SlotCompleteJob extends Job
{
  protected $wallet;

  public function __construct($wallet)
  {
    $this->wallet = $wallet;
  }

  public function handle($wallet)
  {
    $slot = Slot::where("assigned_wallet")->get();

    $dueDate = Carbon::createFromTimestamp($slot->dueDate);
    $now = Carbon::now();

    if($dueDate->gt($now)) {
      // get user
      $user = User::where("wallet", $this->wallet)->first();

      // get activity
      $rewardActivity = RewardActivity::where("sc_activity_id", $slot->activityScId)->firstOrFail();

      if(isset($user->email)) {
        Mail::to($user->email)->queue(new SlotComplete($user, $slot, $rewardActivity));
      }

    }

  }

}
