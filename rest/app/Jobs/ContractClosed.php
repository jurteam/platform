<?php

namespace App\Jobs;

use App\Models\Activity;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContractClosed\PartAcceptsClosingProposal;
use App\Mail\ContractClosed\PartRecieveClosingProposal;

class ContractClosed extends Job
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
        $proposer = $this->activity->getProposer();
        $receiver = $this->activity->getReceiver();
        $contract = $this->activity->contract;

        if (! empty($receiver['address'])) {
            Mail::to($receiver['address'])
                ->send(new PartRecieveClosingProposal(
                    $receiver, $proposer, $contract
                ));
        }
        
        if (! empty($proposer['address'])) {
            Mail::to($proposer['address'])
                ->send(new PartAcceptsClosingProposal(
                    $proposer, $receiver, $contract
                ));
        }
    }
}
