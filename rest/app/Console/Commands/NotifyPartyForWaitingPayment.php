<?php

namespace App\Console\Commands;

use App\Models\Contract;
use Illuminate\Console\Command;
use App\Jobs\WaitingForCounterPartyPaymentReminder;

class NotifyPartyForWaitingPayment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jur:contract-payment-pending';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for all contracts that are in Waiting for Payment state';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        // check for contract in status 3

        $contracts = Contract::waitingForPayment()->chunk(20);

        $bar = $this->output->createProgressBar($contracts->count());

        foreach ($contracts as $contractsSet) {

            $job = (new WaitingForCounterPartyPaymentReminder($contractsSet))->delay(60);

            dispatch($job);

            $bar->advance();
        }

        $this->info('Done!');
    }
}
