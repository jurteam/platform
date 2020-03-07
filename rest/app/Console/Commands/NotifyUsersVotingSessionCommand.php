<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Contract;
use Illuminate\Console\Command;
use App\Jobs\DisputeVotingSession;
use App\Jobs\MemberDisputeVotingSession;

class NotifyUsersVotingSessionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jur:dispute-voting-session';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for dispute voting session and notify parties and members';

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
        $contracts = Contract::disputes()->get();
        $contracts = $contracts->filter(function($contract) {
            $status = $contract->getCurrentStatus();
            return Carbon::now()->diffInDays($status->custom_status_date) == 0;
        })->chunk(20);

        $contracts->each(function($contractsSet) {
            $job = (new DisputeVotingSession($contractsSet))->delay(60);

            dispatch($job);
        });

        $contracts->each(function($contractsSet) {
            $members = User::exceptFromContracts(
                $contractsSet->pluck('user_id')->unique()
            )->get();

            $job = (new MemberDisputeVotingSession(
                $members, $contractsSet
            ))->delay(60);

            dispatch($job);
        });
    }
}
