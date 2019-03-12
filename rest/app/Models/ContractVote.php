<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class ContractVote extends Model implements HasMedia
{
    use HasMediaTrait;

    /**
     * Retrieve contract.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    /**
     * Check if the owner is the current user.
     *
     * @return boolean
     */
    public function itsMe()
    {
        return $this->contract->part_a_wallet == $this->oracle_wallet;
    }
}
