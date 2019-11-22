<?php

namespace App\Jobs;

use App\Models\Activity;
use Illuminate\Support\Facades\Mail;
use App\Mail\WaitingForPayment\RecipientAcceptContract;
use App\Mail\WaitingForPayment\RecipientAcceptedContract;

class WaitingForPayment extends Job
{
    protected $activity;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Activity $activity)
    {
        $this->activity = $activity;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $creator = $this->activity->getCreator();
        $recipient = $this->activity->getRecipient();
        $contract = $this->activity->contract;

        if (! empty($recipient['address'])) {
            Mail::to($recipient['address'])
                ->send(new RecipientAcceptContract(
                    $recipient, $creator, $contract
                ));
        }

        if (! empty($creator['address'])) {
            Mail::to($creator['address'])
                ->send(new RecipientAcceptedContract(
                    $creator, $recipient, $contract
                ));
        }
    }
}
