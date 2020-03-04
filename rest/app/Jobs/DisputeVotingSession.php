<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\OngoingDispute\NotifyPartiesForVotingSession;

class DisputeVotingSession extends Job
{
    private $disputes;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($disputes)
    {
        $this->disputes = $disputes;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->disputes->each(function($dispute) {
            $addresses = $dispute->getCounterpartiesAddress();

            foreach ($addresses as $party) {
                Mail::to($party['address'])
                    ->send(new NotifyPartiesForVotingSession($party, $dispute));
            }
        });
    }
}
