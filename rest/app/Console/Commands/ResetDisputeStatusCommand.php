<?php

namespace App\Console\Commands;

use App\Models\Contract;
use Illuminate\Console\Command;

class ResetDisputeStatusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jur:dispute-reset-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update dispute status to fix search filters';

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
        Contract::disputes()
            ->chunk(20, function($disputes) {
                $disputes->each(function($dispute) {
                    if ($dispute->shouldRestoreStatus()) {
                        $dispute->resetOnFirstStatus();
                    }
                });
            });
    }
}
