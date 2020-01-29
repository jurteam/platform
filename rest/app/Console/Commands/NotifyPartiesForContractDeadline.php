<?php

namespace App\Console\Commands;

use App\Models\Contract;
use Illuminate\Console\Command;
use App\Jobs\OngoingContractReachDeadline;

class NotifyPartiesForContractDeadline extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jur:contract-deadline';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for all contracts that are near to their deadline date and notify parties';

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
        $contracts = Contract::all()->chunk(20);

        $bar = $this->output->createProgressBar($contracts->count());

        foreach ($contracts as $contractsSet) {
            $job = (new OngoingContractReachDeadline($contractsSet))->delay(60);

            dispatch($job);

            $bar->advance();
        }

        $this->info('Done!');
    }
}
