<?php

namespace App\Filters;

use Carbon\Carbon;

class ContractVoteFilters extends Filters
{
    protected $filters = [
        'order',
        'live'
    ];

    public function order($value)
    {
        $query = $this->builder;
        foreach ($value as $field => $ordering) {
            $query->orderBy($field, $ordering);
        }
        return $query;
    }

    public function live($value)
    {
        $date = Carbon::parse($value);
        return $this->builder->where('created_at', '>=', $date->format('Y-m-d H:i:s'));
    }
}
