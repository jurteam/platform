<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\Votes\VoteMajorityChanged;

class NotifyPartecipantsForMajorityChange extends Job
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
            if ($partecipant->email) {
                Mail::to($partecipant->email)
                    ->queue(new VoteMajorityChanged($partecipant, $this->contract));
            }
        }
    }
}
