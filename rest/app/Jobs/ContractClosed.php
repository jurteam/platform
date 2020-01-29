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
        $creator = $this->activity->getCreatorFromWallet();
        $recipient = $this->activity->getRecipientFromWallet();
        $contract = $this->activity->contract;

        if (! empty($creator['address'])) {
            Mail::to($creator['address'])
                ->send(new PartAcceptsClosingProposal(
                    $creator, $recipient, $contract
                ));
        }

        if (! empty($recipient['address'])) {
            Mail::to($recipient['address'])
                ->send(new PartRecieveClosingProposal(
                    $recipient, $creator, $contract
                ));
        }
    }
}
