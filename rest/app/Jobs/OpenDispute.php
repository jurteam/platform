<?php

namespace App\Jobs;

use App\Models\Activity;
use Illuminate\Support\Facades\Mail;
use App\Mail\OpenDispute\CreatorSentRejectResolution;
use App\Mail\OpenDispute\RecipientReceiveRejectResolution;

class OpenDispute extends Job
{
    private $activity;

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
        $contract = $this->activity;

        if (! empty($creator['address'])) {
            Mail::to($creator['address'])
                ->send(new CreatorSentRejectResolution(
                    $creator, $recipient, $contract
                ));
        }

        if (! empty($recipient['address'])) {
            Mail::to($recipient['address'])
                ->send(new RecipientReceiveRejectResolution(
                    $recipient, $creator, $contract
                ));
        }
    }
}
