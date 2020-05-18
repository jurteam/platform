<?php

namespace App\Filters;

class OathKeeperFilters extends Filters
{
    protected $filters = [
        'minAmount',
        'maxAmount',
        'startsAt',
        'endsAt',
        'status',
        'query',
        'sortBy'
    ];

    protected $sortBy = [
        'Rank' => ['rank', 'asc'],
        'Amount' => ['total_amount', 'asc'],
        'OathCount' => ['active_oath_count', 'asc'],
        '-Rank' => ['rank', 'desc'],
        '-Amount' => ['total_amount', 'desc'],
        '-OathCount' => ['active_oath_count', 'desc']
    ];

    public function minAmount($value)
    {
        return $this->builder->where('active_amount', '>', $value);
    }

    public function maxAmount($value)
    {
        return $this->builder->where('active_amount', '<', $value);
    }

    public function sortBy($key)
    {

        $result = isset($this->sortBy[$key]) ? $this->sortBy[$key] : null;

        if ($result) {
            return $this->builder->orderBy($result[0], $result[1]);
        }

    }

    public function query($value)
    {
        return $this->builder
            ->where('wallet', 'LIKE', "%{$value}%")
            ->orWhere('oath_keepers.total_amount', $value)
            ->orWhere('oath_keepers.active_amount', $value)
            ->orWhere('oath_keepers.rank', $value);

    }
}
