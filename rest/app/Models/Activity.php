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
        'chain_updated_at',
        'chain_update_to'
    ];

    protected $casts = [
        'readed_part_a' => 'boolean',
        'readed_part_b' => 'boolean'
    ];

    protected $dates = [
        'chain_updated_at',
        'chain_update_to'
    ];

    public function scopeFilters($query, $filters)
    {
        return $filters->apply($query);
    }

    public function scopeExceptDraft($query)
    {
        return $query->where('status_code', '<>', 0);
    }

    public function scopeExceptFuture($query)
    {
        return $query->whereRaw('(chain_updated_at IS NULL OR chain_updated_at <= NOW())');
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
        return $this->wallet === null;
    }

    public function getUpdatedDate()
    {
        if (! empty($this->chain_updated_at)) {
            if (!$this->chain_updated_at->isFuture()) {
                return $this->chain_updated_at->valueOf();
            }
        }
        return $this->created_at->valueOf();
    }

    public function getContractDetailsAttachments()
    {
        $attachments = collect([]);
        $activityWallet = $this->wallet;

        if (in_array($this->status_code, [31,35])) {
            if ($this->contract->details->count()) {
                $this->contract->details->filter(function($detail) use($activityWallet) {
                    return $detail->getFromWallet($activityWallet);
                })->each(function($detail) use(&$attachments) {
                    $currentMedia = $detail->getMedia('evidences');
                    if ($currentMedia->count()) {
                        $attachments->push($currentMedia);
                    }
                });
            }
        }
        return $attachments->collapse();
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

    public function isFuture()
    {
        if (! empty($this->chain_updated_at)) {
            return $this->chain_updated_at->isFuture()
        }
        return false;
    }
}
