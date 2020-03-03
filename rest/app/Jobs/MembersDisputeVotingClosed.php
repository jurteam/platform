<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\DisputeClosed\DisputeLosingMember;
use App\Mail\DisputeClosed\DisputeWinningMember;

class MembersDisputeVotingClosed extends Job
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
        foreach ($this->contracts as $contract) {
            $winnerWallet = $contract->getTheWinner(true);
            $loserWallets = $contract->getTheLoser();

            $winners = $contract->getPartecipantsFromWallet(
                $winnerWallet
            );

            $winners->each(function($winner) use($contract) {
                Mail::to($winner->email)
                    ->queue(new DisputeWinningMember($winner, $contract));
            });

            sleep(3);
            
            foreach ($loserWallets as $loserWallet) 
            {
                $losers = $contract->getPartecipantsFromWallet(
                    $loserWallet
                );

                $losers->each(function($loser) use($contract) {
                    Mail::to($loser->email)
                        ->queue(new DisputeLosingMember($loser, $contract));
                });
            }
        }
    }
}
