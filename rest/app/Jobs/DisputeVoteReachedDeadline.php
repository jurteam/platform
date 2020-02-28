<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\DisputeClosed\DisputeLosingPart;
use App\Mail\DisputeClosed\DisputeWinningPart;

class DisputeVoteReachedDeadline extends Job
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
            $loserWallet = $contract->getTheLoser();


            if ($winnerWallet) 
            {
                $email = $contract->getUserEmail($winnerWallet);
    
                if (! $email) {
                    Mail::to($email)
                        ->send(new DisputeWinningPart($contract));
                }
            }

            if ($loserWallet) 
            {
                $email = $contract->getUserEmail($loserWallet);
                if (! $email) {
                    Mail::to($email)
                        ->send(new DisputeLosingPart($contract));
                }
            }

        }
    }
}
