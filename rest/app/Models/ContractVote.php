<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContractVote extends Model
{
    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    public function itsMe()
    {
        return $this->contract->part_a_wallet == $this->oracle_wallet;
    }
}
