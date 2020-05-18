<?php

namespace App\Models;

use App\Jobs\NotifyForMajorityChange;
use App\Models\Traits\UploadableTrait;
use App\Models\Traits\HistoriesTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class ContractVote extends Model implements HasMedia
{
    use HasMediaTrait, UploadableTrait, HistoriesTrait;

    /**
     * @var array
     */
    protected $fillable = [
        'amount',
        'wallet_part',
        'oracle_wallet',
        'contract_id',
        'message',
        'hash',
        'waiting'
    ];

    public static function boot()
    {
        parent::boot();

        static::saved(function($model) {
            $model->checkForMajorityChange();
        });
    }

    public function scopeFilters($query, $filters)
    {
        return $filters->apply($query);
    }

    public function scopeExceptWaiting($query)
    {
        return $query->where('waiting', 0);
    }

    public function scopeByContract($query, $contractId)
    {
        return $query->whereContractId($contractId);
    }

    public function scopeByWalletPart($query, $wallet)
    {
        return $query->whereWalletPart($wallet);
    }

    /**
     * Retrieve contract.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    public function attachments()
    {
        return $this->morphMany(config('medialibrary.media_model'), 'model');
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

    public function checkForMajorityChange()
    {
        $status = $this->contract->getCurrentStatus();
        
        if ($status->code == 35) {
            // only if is a ongoing dispute
            
            // check for majority change
            $majorityChange = $this->contract->majorityChanged();

            info('---- majorityChange', [$majorityChange]);
            
            if ($majorityChange) {
                info('---- send NotifyForMajorityChange');
                dispatch(new NotifyForMajorityChange($this->contract));
            }
        }
    }
}
