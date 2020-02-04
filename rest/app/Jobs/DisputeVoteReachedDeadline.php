<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\DisputeClosed\DisputeLosingPart;
use App\Mail\DisputeClosed\DisputeWinningPart;

class DisputeVoteReachedDeadline extends Job
{
    private $contract;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($contract)
    {
        $this->contract = $contract;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $winnerWallet = $this->contract->getTheWinner(true);
        $loserWallet = $this->contract->getTheLoser();

        $email = $this->contract->getUserEmail($winnerWallet);

        if (! $email) {
            Mail::to($email)
                ->send(new DisputeWinningPart($this->contract));
        }

        $email = $this->contract->getUserEmail($loserWallet);
        if (! $email) {
            Mail::to($email)
                ->send(new DisputeLosingPart($this->contract));
        }

    }
}
