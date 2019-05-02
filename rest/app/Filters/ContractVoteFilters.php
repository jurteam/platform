<?php

namespace App\Filters;

class ContractVoteFilters extends Filters
{
    protected $filters = [
        'order'
    ];

    public function order($value)
    {
        $query = $this->builder;
        foreach ($value as $field => $ordering) {
            $query->orderBy($field, $ordering);
        }
        return $query;
    }
}
