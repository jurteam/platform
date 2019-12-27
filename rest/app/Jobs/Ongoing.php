<?php

namespace App\Jobs;

use App\Models\Activity;
use Illuminate\Support\Facades\Mail;
use App\Mail\Ongoing\ContractOngoing;

class Ongoing extends Job
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
        $recipients[] = [
            'creator' => $this->activity->getCreator(),
            'recipient' => $this->activity->getRecipient()
        ];
        $recipients[] = [
            'creator' => $this->activity->getRecipient(),
            'recipient' => $this->activity->getCreator()
        ];

        foreach ($recipients as $recipient) {
            if (! empty($recipient['creator']['address'])) {
                Mail::to($recipient['creator']['address'])
                    ->send(new ContractOngoing(
                        $recipient['creator'],
                        $recipient['recipient'],
                        $this->activity
                    ));
            }
        }
    }
}
