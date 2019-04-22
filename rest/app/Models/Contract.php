<?php

namespace App\Models;

use App\Models\Traits\StatusesTrait;
use App\Models\Traits\ActivitiesTrait;
use App\Models\Traits\UploadableTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Contract extends Model implements HasMedia
{
    use HasMediaTrait, ActivitiesTrait, StatusesTrait, UploadableTrait;

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
        'wallet'
    ];

    /**
     * @var array
     */
    protected $casts = [
        'is_a_dispute' => 'boolean',
        'is_a_friendly_resolution' => 'boolean'
    ];

    public function scopeFilters($query, $filters)
    {
        return $filters->apply($query);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function status()
    {
        return $this->belongsTo(ContractStatus::class, 'contract_status_id');
    }

    public function votes()
    {
        return $this->hasMany(ContractVote::class);
    }

    public function details()
    {
        return $this->hasMany(ContractStatusDetail::class);
    }

    /**
     * Update status, and save the activity.
     *
     * @param  \Illuminate\Http\Request $params
     * @return void
     */
    public function updateStatusByCode($params)
    {
        $status = ContractStatus::byCode($params->code)->firstOrFail();

        $this->update(['contract_status_id' => $status->id]);

        if ($params->code == 31) {
            $this->flagAsOpenDispute();
        }
        if ($params->code == 21) {
            $this->flagAsFriendlyResolution();
        }

        $user = User::byWallet($params->header('wallet'))->firstOrFail();
        $this->recordActivities([
            'status' => $status->label,
            'status_code' => $status->code
        ], $user);
    }

    /**
     * Store a new contract.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\User $user
     * @return \App\Models\Contract
     */
    public static function storeContract($params, $user)
    {
        $statuses = config('jur.statuses');
        $status = ContractStatus::byCode($statuses[1]['code'])->firstOrFail();

        $attributes = array_merge($params->all(), [
            'contract_status_id' => $status->id,
            'user_id' => $user ? $user->id : null,
            'wallet' => $params->header('wallet')
        ]);
        $contract = static::create($attributes);

        $contract->recordActivities([
            'status' => $status->label,
            'status_code' => $status->code
        ], $user);

        return $contract;
    }
}
