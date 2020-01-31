<?php

namespace App\Console\Commands;

use App\Models\Contract;
use Illuminate\Console\Command;
use App\Jobs\OngoingContractReachedDeadline;

class NotifyPartiesForContractExpired extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jur:contract-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notify parties when the contract has reached deadline date.';

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
        $contracts = Contract::reachDeadline(true)->chunk(20);

        $bar = $this->output->createProgressBar($contracts->count());

        foreach ($contracts as $contractsSet) {
            $job = (new OngoingContractReachedDeadline($contractsSet))->delay(60);

            dispatch($job);

            $bar->advance();
        }

        $this->info('Done!');

    }
}
