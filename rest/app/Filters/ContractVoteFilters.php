<?php

namespace App\Filters;

use Carbon\Carbon;

class ContractVoteFilters extends Filters
{
    protected $filters = [
        'live',
        'orderBy'
    ];

    protected $orderBy = [
        'wallet_part',
        'amount',
        'id'
    ];

    public function orderBy($value)
    {
        $query = $this->builder;

        foreach ($value as $field => $ordering) {
            if (in_array($field, $this->orderBy)) {
                $query->orderBy($field, $ordering);
            }
        }
        return $query;
    }

    public function live($value)
    {
        $date = Carbon::parse($value);
        return $this->builder->where('created_at', '>=', $date->format('Y-m-d H:i:s'));
    }
}
