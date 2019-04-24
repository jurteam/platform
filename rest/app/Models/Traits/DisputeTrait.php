<?php

namespace App\Models\Traits;

use App\Models\ContractStatusDetail;

trait DisputeTrait
{
    public function getLastPart()
    {
        $last = $this->details->sortByDesc('id')->first();

        return $last->contract_part;
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
                        ->whereRaw('LOWER(wallet_part) = ?', [$part])
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
        $totalCount = $this->getCountPart('part_a_wallet') + $this->getCountPart('part_b_wallet');
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
        if ($this->status->code < 39) {
            return null;
        }

        $currentWallet = request()->header('wallet');

        $totalPartA = $this->getTokensPart('part_a_wallet');
        $totalPartB = $this->getTokensPart('part_b_wallet');
        $voteForWinner = 0;
        if ($totalPartA > $totalPartB) {
            $voteForWinner = $this->getCountPart('part_a_wallet');
        } elseif ($totalPartB > $totalPartA) {
            $voteForWinner = $this->getCountPart('part_b_wallet');
        }

        if ($voteForWinner > 0) {
            return ($totalPartA + $totalPartB) / $voteForWinner;
        }
        return null;
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
                'evidences' => $detail->getEvidences()
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
}
