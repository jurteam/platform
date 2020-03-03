<?php

namespace App\Jobs;

use App\Models\Activity;
use Illuminate\Support\Facades\Mail;
use App\Mail\WaitingForCounterPartyPayment\RecipientDebtorContract;

class WaitingForCounterPartyPaymentReminder extends Job
{
    private $contracts;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($contracts)
    {
        $this->contracts = $contracts;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // foreach contract in status 3 (waiting fo payment)

        $this->contracts->each(function($contract) 
        {
            $currentActivity = $contract->getCurrentActivity();

            if ($currentActivity->status_code == 3) 
            {
                $receiver = $currentActivity->getReceiver();
    
                $contract = $currentActivity->contract;
    
                if (! empty($receiver['address'])) {
                    Mail::to($receiver['address'])
                        ->queue(new RecipientDebtorContract(
                            $receiver, $contract
                        ));
                }
            }

        });

    }
}
