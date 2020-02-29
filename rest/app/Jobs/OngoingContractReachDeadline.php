<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\Ongoing\ContractReachDeadline;

class OngoingContractReachDeadline extends Job
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
        $this->contracts->filter(function($contract) {
            return count($contract->getCounterpartiesAddress()) > 0;
        })->each(function($contract) {
            foreach ($contract->getCounterpartiesAddress() as $party) {
                Mail::to($party['address'])
                    ->queue(new ContractReachDeadline($party, $contract));
            }
        });
    }
}
