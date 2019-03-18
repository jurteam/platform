<?php

namespace App\Models;

use App\Models\Traits\UploadableTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class ContractVote extends Model implements HasMedia
{
    use HasMediaTrait, UploadableTrait;

    /**
     * @var array
     */
    protected $fillable = [
        'amount',
        'wallet_part'
        'oracle_wallet',
        'contract_id',
        'message',
        'hash'
    ];

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
