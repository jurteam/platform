<?php

namespace App\Filters;

class AdvocateFilters extends Filters
{
    protected $filters = [
        'sortBy'
    ];

    protected $sortBy = [
        'TotalEarned' => ['total_earned', 'asc'],
        '-TotalEarned' => ['total_earned', 'desc']
    ];

    protected $defaults = [
        'sortBy' => 'TotalEarned'
    ];

    public function sortBy($key)
    {
        $result = isset($this->sortBy[$key]) ? $this->sortBy[$key] : ['total_earned', 'asc'];

        return $this->builder->orderBy($result[0], $result[1]);
    }
}
