<?php

namespace App\Models\Traits;

use App\Models\User;
use App\Models\ContractVote;

trait VotableTrait
{
    public function votes()
    {
        return $this->hasMany(ContractVote::class);
    }

    /**
     * Get the voters.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getPartecipants()
    {
        $wallets = $this->votes->pluck('oracle_wallet')->merge([$this->part_a_wallet,$this->part_b_wallet]);

        return User::byWallets($wallets)->get()->unique('wallet');
    }

    /**
     * Get members.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */

    public function getMembers()
    {
        $wallets = $this->votes->pluck('oracle_wallet')->merge([$this->part_a_wallet,$this->part_b_wallet]);

        return User::excludeWallets($wallets)->get()->unique('wallet');
    }
}
