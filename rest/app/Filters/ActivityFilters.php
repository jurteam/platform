<?php

namespace App\Filters;

use Carbon\Carbon;
use App\Models\User;

class ActivityFilters extends Filters
{
    /**
     * List of available filters
     *
     * @var array
     */
    protected $filters = [
        'wallet',
        'orderBy',
        'status',
        'byDate'
    ];

    public function wallet($value)
    {
        $lowerWallet = strtolower($value);
        $user = User::byWallet($value)->firstOrFail();

        return $this->builder->where('user_id', $user->id)
                        ->orWhereRaw('LOWER(to_wallet) = ?', [$lowerWallet]);
    }

    public function status($value)
    {
        return $this->builder->where('readed', $value);
    }

    public function byDate($value)
    {
        $from = Carbon::parse($value)->startOfDay();

        return $this->builder->where('created_at', '>=', $from);
    }

    public function orderBy($ordering)
    {
        return $this->builder->orderBy('created_at', $ordering);
    }
}
