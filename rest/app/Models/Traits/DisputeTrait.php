<?php

namespace App\Models\Traits;

trait DisputeTrait
{
    public function getLastPart()
    {
        $last = $this->details->sortByDesc('id')->first();

        return $last->contract_part;
    }

    public function getTokensPart($part)
    {
        $part = $this->{$part};
        $totalPart = $this->votes->where('wallet_part', $part)->sum('amount');

        return $totalPart;
    }

    public function getEarnings()
    {
        if ($this->status->code =! 39) {
            return null;
        }

        $totalPartA = $this->getTokensPart('part_a_wallet');
        $totalPartB = $this->getTokensPart('part_b_wallet');
        $voteForWinner = 0;
        if ($totalPartA > $totalPartB) {
            $voteForWinner = $this->votes->where('wallet_part', $this->part_a_wallet)->count();
        } elseif ($totalPartB > $totalPartA) {
             $voteForWinner = $this->votes->where('wallet_part', $this->part_b_wallet)->count();
        }

        if ($voteForWinner > 0) {
            return ($totalPartA + $totalPartB) / $voteForWinner;
        }
        return null;
    }

    public function getProposalPart($part)
    {
        $partFields = "{$part}_wallet";
        $detail = $this->details->where('contract_part', $this->{$partFields})->first();

        if ($detail) {
            return [

            ];
        }

        return $detail;
    }
}
