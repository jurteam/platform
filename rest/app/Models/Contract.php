<?php

namespace App\Models;

use App\Models\Traits\DisputeTrait;
use App\Models\Traits\StatusesTrait;
use App\Models\Traits\HistoriesTrait;
use App\Models\Traits\ActivitiesTrait;
use App\Models\Traits\UploadableTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Contract extends Model implements HasMedia
{
    use HasMediaTrait, ActivitiesTrait, StatusesTrait, UploadableTrait, DisputeTrait, HistoriesTrait;

    protected $fillable = [
        'name',
        'address',
        'part_a_wallet',
        'part_a_name',
        'part_a_email',
        'part_b_wallet',
        'part_b_name',
        'part_b_email',
        'kpi',
        'resolution_proof',
        'category',
        'value',
        'balance',
        'in_case_of_dispute',
        'has_penalty_fee',
        'part_a_penalty_fee',
        'part_b_penalty_fee',
        'duration_days',
        'duration_hours',
        'duration_minutes',
        'contract_status_id',
        'is_a_dispute',
        'is_a_friendly_resolution',
        'who_pays',
        'user_id',
        'wallet',
        'chain_updated_at'
    ];

    /**
     * @var array
     */
    protected $casts = [
        'is_a_dispute' => 'boolean',
        'is_a_friendly_resolution' => 'boolean'
    ];

    protected $dates = [
        'chain_updated_at'
    ];

    public function scopeFilters($query, $filters)
    {
        return $filters->apply($query);
    }

    public function scopeDisputes($query)
    {
        return $query->where('is_a_dispute', true);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function votes()
    {
        return $this->hasMany(ContractVote::class);
    }

    public function details()
    {
        return $this->hasMany(ContractStatusDetail::class);
    }

    public function histories()
    {
        return $this->hasMany(ContractStatusHistory::class);
    }

    /**
     * hold for old jur db schema
     */
    public function status()
    {
        return $this->belongsTo(ContractStatus::class, 'contract_status_id');
    }

    /**
     * Update status, and save the activity.
     *
     * @param  \Illuminate\Http\Request $params
     * @return void
     */
    public function updateStatusByCode($params)
    {
        $user = User::byWallet($params->header('wallet'))->first();
        $status = ContractStatus::byCode($params->code)->firstOrFail();

        $chainUpdatedAt = $this->getChainUpdatedAtFromRequest($params);

        $this->recordHistories($chainUpdatedAt, $status);

        if ($params->code == 31) {
            $this->createProposalForCounterPart($params);
        }
        if ($params->code == 21) {
            $this->flagAsFriendlyResolution();
        }
        if ($params->code == 35) {
            $this->flagAsOpenDispute();
        }

        if ($this->shouldRestoreStatus()) {
            $this->resetOnFirstStatus();
        }

        $activity = $this->recordActivities(array_merge($params->all(), [
            'status' => $status->label,
            'status_code' => $status->code,
            'to_wallet' => $this->getSendTo($params->header('wallet')),
            'wallet' => $params->header('wallet'),
            'chain_updated_at' => $chainUpdatedAt
        ]), $user);

        $this->notifyCounterPart($activity);
    }

    /**
     * Store a new contract.
     *
     * @param  \Illuminate\Http\Request $params
     * @param  \App\Models\User $user
     * @return \App\Models\Contract
     */
    public static function storeContract($params, $user)
    {
        $statuses = config('jur.statuses');
        $status = ContractStatus::byCode($statuses[1]['code'])->firstOrFail();

        $contract = static::create(array_merge(
            $params->all(), [
                'user_id' => $user ? $user->id : null,
                'wallet' => $params->header('wallet')
            ]
        ));

        $contract->recordHistories(null, $status);

        $contract->recordActivities([
            'status' => $status->label,
            'status_code' => $status->code,
            'to_wallet' => $contract->getSendTo($params->header('wallet')),
            'wallet' => $params->header('wallet')
        ], $user);

        return $contract;
    }

    public function getWhoPaysAmount()
    {
        if ($this->who_pays == $this->part_a_wallet) {
            return $this->value + $this->part_a_penalty_fee;
        } elseif ($this->who_pays == $this->part_b_wallet) {
            return $this->value + $this->part_b_penalty_fee;
        }
        return 0;
    }
}
