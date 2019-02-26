<?php

namespace App\Models;

use App\Models\Traits\ActivitiesTrait;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use ActivitiesTrait;

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
        'contract_status_id'
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

    public function updateStatus($params, User $user)
    {
        $this->update([
            'contract_status_id' => $params->status
        ]);

        $this->recordActivities($params, $user);
    }

    public function statusActivity()
    {
        return $this->activities->filter(function($activity) {
            return $activity->type == config('jur.activities.types.status_changed')
        })->first();
    }
}
