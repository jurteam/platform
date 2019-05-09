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
        'readed_part_a',
        'readed_part_b',
        'abstract',
        'to_wallet',
        'wallet',
        'message',
        'proposal_part_a',
        'proposal_part_b',
        'status',
        'status_code',
        'user_id',
        'contract_id',
        'chain_updated_at'
    ];

    protected $casts = [
        'readed_part_a' => 'boolean',
        'readed_part_b' => 'boolean'
    ];

    protected $dates = ['chain_updated_at'];

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

    public function details()
    {
        return $this->belongsTo(Contract::class);
    }

    public function attachments()
    {
        return $this->morphMany(config('medialibrary.media_model'), 'model');
    }

    public function fromSystem()
    {
        return is_null($this->wallet);
    }

    public function getUpdatedDate()
    {
        if (! empty($this->chain_updated_at)) {
            return $this->chain_updated_at->valueOf();
        }
        return $this->created_at->valueOf();
    }

    public function getContractDetails()
    {
        if ($this->contract->hasStatusCode($this->status_code)) {
            return $this->contract->details;
        }
        return [];
    }

    public function getStatusFromWallet($wallet)
    {
        $contract = $this->contract;
        if (strtolower($contract->part_a_wallet) == strtolower($wallet)) {
            return $this->readed_part_a;
        } elseif (strtolower($contract->part_b_wallet) == strtolower($wallet)) {
            return $this->readed_part_b;
        }
        return false;
    }

    public function updateStatusFromWallet($wallet)
    {
        $contract = $this->contract;
        if (strtolower($contract->part_a_wallet) == strtolower($wallet)) {
            $this->update([
                'readed_part_a' => true
            ]);
        } elseif (strtolower($contract->part_b_wallet) == strtolower($wallet)) {
            $this->update([
                'readed_part_b' => true
            ]);
        }
    }

    public static function updateStatus($params)
    {
        $currentWallet = $params->header('wallet');
        foreach ($params->ids as $id) {
            $activity = static::find($id);
            $activity->updateStatusFromWallet($currentWallet);
        }
    }
}
