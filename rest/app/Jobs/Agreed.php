<?php

namespace App\Jobs;

use App\Models\Activity;
use Illuminate\Support\Facades\Mail;
use App\Mail\Agreed\PartSendingClosingProposal;
use App\Mail\Agreed\PartReceivingClosingProposal;

class Agreed extends Job
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
        $proposer = $this->activity->getProposer();
        $receiver = $this->activity->getReceiver();

        $contract = $this->activity->contract;

        if (! empty($proposer['address'])) {
            Mail::to($proposer['address'])
                ->send(new PartSendingClosingProposal(
                    $proposer, $receiver, $contract
                ));
        }

        if (! empty($receiver['address'])) {
            Mail::to($receiver['address'])
                ->send(new PartReceivingClosingProposal(
                    $proposer, $receiver, $contract
                ));
        }
    }
}