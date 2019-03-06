<?php

namespace App\Models;

use App\Models\Traits\ActivitiesTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Contract extends Model implements HasMedia
{
    use HasMediaTrait, ActivitiesTrait;

    protected $fillable = [
        'name',
        'part_a_wallet',
        'part_a_public_name',
        'part_a_name',
        'part_b_wallet',
        'part_b_public_name',
        'part_b_name',
        'kpi',
        'resolution_proof',
        'category_id',
        'value',
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
        return $this->belongsTo(User::class);
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

        $this->recordActivities($params, $user);
    }
}
