<?php

namespace App\Models;

use App\Models\Traits\UploadableTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Activity extends Model implements HasMedia
{
    use HasMediaTrait, UploadableTrait;

    protected $fillable = [
        'readed',
        'to_wallet',
        'wallet',
        'message',
        'proposal_part_a',
        'proposal_part_b',
        'status',
        'status_code',
        'user_id',
        'contract_id'
    ];

    public function scopeFilters($query, $filters)
    {
        return $filters->apply($query);
    }

    public function scopeExceptDraft($query)
    {
        return $query->where('status_code', '<>', 0);
    }

    public function scopeByContract($query, int $contractId)
    {
        return $query->whereContractId($contractId);
    }

    public function scopeByUser($query, $userId)
    {
        return $query->whereUserId($userId);
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

    /**
     * Retrieve owner.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attachments()
    {
        return $this->morphMany(config('medialibrary.media_model'), 'model');
    }
}
