<?php

namespace App\Models\Traits;

use App\Models\User;
use App\Models\Contract;
use App\Models\ContractStatusDetail;
use App\Models\Withdrawal;

trait DisputeTrait
{

    public function Withdrawals()
    {
        return $this->hasMany(Withdrawal::class);
    }

    public function getPartialsData()
    {
        $totalTokensPartA = $this->getTokensPart('part_a_wallet');
        $totalTokensPartB = $this->getTokensPart('part_b_wallet');
        $totalRejectVotes = $this->getRejectVotes();

        return [
            'totalTokensPartA' => $totalTokensPartA,
            'totalTokensPartB' => $totalTokensPartB,
            'totalTokensReject' => $totalRejectVotes,
            'totalTokens' => $totalTokensPartA + $totalTokensPartB + $totalRejectVotes,
            'percentagePartA' => $this->getPercetangePart('part_a_wallet'),
            'percentagePartB' => $this->getPercetangePart('part_b_wallet'),
            'current_winner' => $this->getTheWinner(false),
        ];
    }

    public function majorityChanged()
    {
        // compare actual majority with majority generated from all votes without last vote

        $totalTokensPartANow = $this->getTokensPart('part_a_wallet');
            // info('totalTokensPartANow', [$totalTokensPartANow]);
        $totalTokensPartBNow = $this->getTokensPart('part_b_wallet');
            // info('totalTokensPartBNow', [$totalTokensPartBNow]);
        $totalRejectVotesNow = $this->getRejectVotes();
            // info('totalRejectVotesNow', [$totalRejectVotesNow]);
        
        $majorityNow = $this->compareTokenSum($totalTokensPartANow, $totalTokensPartBNow, $totalRejectVotesNow );
            // info('majorityNow', [$majorityNow]);
        
        $lastVote = $this->votes()->latest()->first();
        
            // info('lastVote', [$lastVote]);
        
        $totalTokensPartABefore = $lastVote->wallet_part === strtolower($this->part_a_wallet) ? ($totalTokensPartANow - $lastVote->amount) : $totalTokensPartANow;
            // info('totalTokensPartABefore', [$totalTokensPartABefore]);
        $totalTokensPartBBefore = $lastVote->wallet_part === strtolower($this->part_b_wallet) ? ($totalTokensPartBNow - $lastVote->amount) : $totalTokensPartBNow;
            // info('totalTokensPartBBefore', [$totalTokensPartBBefore]);
        $totalRejectVotesBefore = $lastVote->wallet_part === '0x0' ? ($totalRejectVotesNow - $lastVote->amount) : $totalRejectVotesNow;
            // info('totalRejectVotesBefore', [$totalRejectVotesBefore]);
        
        $majorityBefore = $this->compareTokenSum($totalTokensPartABefore, $totalTokensPartBBefore, $totalRejectVotesBefore );
            // info('majorityBefore', [$majorityBefore]);

        $majorityHasChanged = false;
        
        if ($majorityBefore !== $majorityNow && $majorityNow !== 'draw') 
        {
            // majority change happens when there is a clare majority different from precedent state
            $majorityHasChanged = true;
        }

        return $majorityHasChanged;
    }

    public function compareTokenSum($partAtoken, $partBtoken, $rejectTokens)
    {
        $result = '';
        if ($partAtoken == $partBtoken && $partBtoken == $rejectTokens) {
            $result = 'draw';
        } elseif ($partAtoken == $partBtoken) {
            $result = 'draw';//drawAB
        } elseif ($partAtoken == $rejectTokens) {
            $result = 'draw';//drawAR
        } elseif ($partBtoken == $rejectTokens) {
            $result = 'draw';//drawBR
        } elseif ($rejectTokens > $partAtoken && $rejectTokens > $partBtoken) {
            $result = 'reject';
        } elseif ($partAtoken > $partBtoken) {
            $result = 'partA';
        } elseif ($partAtoken < $partBtoken) {
            $result = 'partB';
        }

        return $result;
    }

    public function getLastPart()
    {
        $last = $this->details->sortByDesc('id')->first();
        if ($last) {
            return $last->contract_part;
        }
        return null;
    }

    /**
     * Calculate the total amount of token.
     *
     * @param  string $part
     * @return double
     */
    public function getTokensPart($part)
    {
        $part = strtolower($this->{$part});
        $totalPart = $this->votes()
                        ->exceptWaiting()
                        ->whereRaw('LOWER(wallet_part) = ?', [$part])
                        ->sum('amount');

        return $totalPart;
    }

    public function getRejectVotes()
    {
        $totalPart = $this->votes()
                        ->exceptWaiting()
                        ->whereRaw('LOWER(wallet_part) = ?', ['0x0'])
                        ->sum('amount');

        return $totalPart;
    }

    public function getCountPart($part)
    {
        $lowerWallet = strtolower($this->{$part});
        return $this->votes()->whereRaw('LOWER(wallet_part) = ?', [$lowerWallet])->count();
    }

    /**
     * Calculate the percentage of votes.
     *
     * @param  string $part
     * @return double
     */
    public function getPercetangePart($part)
    {
        $totalCount = $this->getTokensPart('part_a_wallet') + $this->getTokensPart('part_b_wallet') + $this->getRejectVotes();
        $tokenPart = $this->getTokensPart($part);

        if ($totalCount > 0) {
            return ($tokenPart / $totalCount) * 100;
        }
        return 0;
    }

    /**
     * Calculate the token that user can earn.
     *
     * @return null|double
     */
    public function getEarnings()
    {
        $currentStatus = $this->status ?: $this->getCurrentStatus();
        if ($currentStatus && $currentStatus->code < 39) {
            return null;
        }

        $totalPartA = $this->getTokensPart('part_a_wallet');
        $totalPartB = $this->getTokensPart('part_b_wallet');
        $totalRejectVotes = $this->getRejectVotes();
        $voteForWinner = 0;
        if ($totalPartA > $totalPartB) {
            $voteForWinner = $this->getCountPart('part_a_wallet');
        } elseif ($totalPartB > $totalPartA) {
            $voteForWinner = $this->getCountPart('part_b_wallet');
        }

        if ($voteForWinner > 0) {
            return ($totalPartA + $totalPartB + $totalRejectVotes) / $voteForWinner;
        }
        return null;
    }

    public function getTotalWithdraw($wallet)
    {
        $currentStatus = $this->status ?: $this->getCurrentStatus();
        if ($currentStatus && $currentStatus->code < 39) {
            return null;
        }
        
        if ($this->withdrawals == null) {
            return 0;
        }
        
        $withdrawals = $this->withdrawals
            ->filter(function($withdrawal) use($wallet) {
                return strtolower($withdrawal->wallet) == strtolower($wallet);
            });

        $withdraw = $withdrawals->filter(function($withdrawal) {
            return $withdrawal->type == 'withdraw';
        })->sum('amount');

        $payout = $withdrawals->filter(function($withdrawal) {
            return $withdrawal->type == 'payout';
        })->sum('amount');

        return $withdraw + $payout;
    }

    /**
     * Get the proposal part for current dispute.
     *
     * @param  string $part
     * @return mixed
     */
    public function getProposalPart($part)
    {
        $partFields = "{$part}_wallet";
        $lowerWallet = strtolower($this->{$partFields});
        $detail = $this->details()
                    ->whereRaw('LOWER(contract_part) = ?', [$lowerWallet])
                    ->where('waiting', 0)
                    ->latest()
                    ->first();

        if ($detail) {
            return [
                'date' => $detail->created_at->valueOf(),
                'message' => $detail->message,
                'proposal' => (object) [
                    'proposal_part_a' => $detail->proposal_part_a,
                    'proposal_part_b' => $detail->proposal_part_b
                ],
                'payed_at' => $detail->payed_at ? $detail->payed_at->valueOf() : null,
                'attachments' => $detail->getAttachments()
            ];
        }

        return $detail;
    }

    /**
     * Check if the current user connected to the chain has voted.
     *
     * @return boolean
     */
    public function currentWalletIsAnOracle()
    {
        $currentWallet = strtolower(request()->header('wallet'));

        return $this->votes()->whereRaw('LOWER(oracle_wallet) = ?', [$currentWallet])->count() > 0;
    }

    public function getTheWinner($partials = false)
    {
        $status = $this->getCurrentStatus();

        $validStatusCode = [9,29,39];

        $statuses = config('jur.statuses');
        $validStatus = array_filter($statuses, function($status) {
            return in_array($status['code'], [9,29,39]);
        });

        if ($status) 
        {
            if (in_array($status->code, $validStatusCode) || !$partials) 
            {
                $totalPartA = $this->getTokensPart('part_a_wallet');
                $totalPartB = $this->getTokensPart('part_b_wallet');
                $totalRejectVotes = $this->getRejectVotes();

                
                if ($totalRejectVotes > $totalPartA && $totalRejectVotes > $totalPartB) 
                {
                    return '0x0';
                } 
                else 
                {                    
                    if ($totalPartA > $totalPartB) 
                    {
                        return $this->part_a_wallet;
                    }
                    elseif ($totalPartB > $totalPartA) 
                    {
                        return $this->part_b_wallet;
                    }
                }
            }
        }

        return null;
    }

    public function getTheLoser()
    {
        $winner = $this->getTheWinner();

        if ($winner == '0x0') 
        {
            return [$this->part_a_wallet,$this->part_b_wallet];

        } 
        elseif ($this->part_a_wallet == $winner) 
        {
            return [$this->part_b_wallet];
        }
        return [$this->part_a_wallet];
    }

    /**
     * Check for dispute update status
     *
     * @return  boolean
     */
    public function shouldRestoreStatus()
    {
        $status = $this->getCurrentStatus();
        return $this->is_a_dispute && $status->code < 35;
    }

    public function resetOnFirstStatus()
    {
        $this->update(['is_a_dispute' => false]);
    }

    public function getWinner()
    {
        $winner = $this->getTheWinner();

        if ($this->part_a_wallet == $winner) {
            return $this->part_a_name ?: $this->part_a_wallet;
        } elseif ($this->part_b_wallet == $winner) {
            return $this->part_b_name ?: $this->part_b_wallet;
        }
    }

    public function getLoser()
    {
        $winner = $this->getTheWinner();

        if ($this->part_a_wallet <> $winner) {
            return $this->part_a_name ?: $this->part_a_wallet;
        } elseif ($this->part_b_wallet <> $winner) {
            return $this->part_b_name ?: $this->part_b_wallet;
        }
    }

    public function getPartecipantsFromWallet($wallet)
    {
        $wallets = $this->votes
            ->where('wallet_part', $wallet)
            ->pluck('oracle_wallet');

        return User::byWallets($wallets)->get()->unique('wallet');
    }

    protected function createProposalForCounterPart($params)
    {
        $counterPart = $this->getCounterPart($this, $params);
        $attributes = [
            'contract_part' => $counterPart['wallet'],
            'proposal_part_a' => 0,
            'proposal_part_b' => 0
        ];

        if ($counterPart['part'] == 'a') {
            $attributes['proposal_part_a'] = $this->value + $this->part_a_penalty_fee + $this->part_b_penalty_fee;
        } else {
            $attributes['proposal_part_b'] = $this->value + $this->part_a_penalty_fee + $this->part_b_penalty_fee;
        }

        $detail = new ContractStatusDetail($attributes);
        $detail
            ->contract()
            ->associate($this)
            ->save();

        return $detail;
    }

    protected function getCounterPart(Contract $contract, $params)
    {
        if ($contract->part_a_wallet == $params->header('wallet')) {
            return [
                'wallet' => $contract->part_b_wallet,
                'part' => 'b'
            ];
        }

        return [
            'wallet' => $contract->part_a_wallet,
            'part' => 'a'
        ];
    }
}
