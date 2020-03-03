<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\OngoingDispute\PartyDisputeReachDeadline;

class NotifyPartecipantsForDisputeReachDeadline extends Job
{
    private $partecipants;

    private $contract;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($partecipants, $contract)
    {
        $this->partecipants = $partecipants;
        $this->contract = $contract;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->partecipants as $partecipant) {
            Mail::to($partecipant->email)
                ->queue(new PartyDisputeReachDeadline(
                    $partecipant, $this->contract
                ));
        }
    }
}
