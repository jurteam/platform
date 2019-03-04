<?php

namespace App\Filters;

class ContractFilters extends Filters
{
    /**
     * @var array
     */
    protected $filters = [
        'status', 'from', 'to', 'query', 'owner'
    ];

    public function owner($value)
    {
        return $this->builder->whereUserId($value);
    }

    public function status($value)
    {
        return $this->builder->whereContractStatusId($value);
    }

    public function from($value)
    {
        return $this->builder->where('created_at', '>=', $value);
    }

    public function to($value)
    {
        return $this->builder->where('created_at', '<=', $value);
    }

    public function query($value)
    {
        return $this->builder
                    ->where('name', 'LIKE', "%{$value}%")
                    ->orWhere('part_a_wallet', 'LIKE', "%{$value}%")
                    ->orWhere('part_a_public_name', 'LIKE', "%{$value}%");
    }
}
