<?php

namespace App\Models;

use App\Models\Traits\StatusesTrait;
use App\Models\Traits\ActivitiesTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Contract extends Model implements HasMedia
{
    use HasMediaTrait, ActivitiesTrait, StatusesTrait;

    protected $fillable = [
        'tx_hash',
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
        'durantion_days',
        'duration_hours',
        'duration_minutes',
        'contract_status_id',
        'is_a_dispute',
        'is_a_friendly_resolution'
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
        return $this->belongsTo(ContractStatus::class);
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
     * @param  \App\Models\User $user
     * @return void
     */
    public function updateStatusByCode($params, User $user)
    {
        $status = ContractStatus::byCode($request->code)->firstOrFail();

        $this->update([
            'contract_status_id' => $status->id
        ]);

        if ($request->code == 31) {
            $this->flagAsOpenDispute();
        }
        if ($request->code == 21) {
            $this->flagAsFriendlyResolution();
        }

        $this->recordActivities($params, $user);
    }

    /**
     * Store a new contract.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  string $wallet
     * @return \App\Models\Contract
     */
    public static function storeContract($params, $wallet)
    {
        $statuses = config('jur.statuses');

        $status = ContractStatus::byCode($statuses[1]['code'])->firstOrFail();

        $owner = User::byWallet($wallet)->firstOrFail();
        $contract = new Contract(array_merge($request->all(), [
            'contract_status_id' => $status->id
        ]));
        $owner->contracts()->save($contract);

        $this->recordActivities([
            'status' => $status->label,
            'contract_id' => $contract->id
        ], $owner);

        return $contract;
    }
}
