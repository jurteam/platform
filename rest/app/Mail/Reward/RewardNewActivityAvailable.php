<?php

namespace App\Mail\Reward;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use \App\Models\RewardActivity;
use \App\Models\User;

class RewardNewActivityAvailable extends Mailable
{
    use Queueable, SerializesModels;

    private $rewardActivity;

    private $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, RewardActivity $rewardActivity)
    {
        $this->user = $user;
        $this->rewardActivity = $rewardActivity;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject('A new activity is available')
            ->markdown('emails.reward.new-activity', [
                'username' => isset($this->user->name) ? $this->user->name : $this->user->wallet,
                'activity_name' => $this->rewardActivity->name,
                'url' => env('APP_URL') . '/advocates/' . $this->user->wallet
            ]);
    }

}
