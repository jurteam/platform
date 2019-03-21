<?php

namespace App\Filters;

use Carbon\Carbon;

class ContractFilters extends Filters
{
    /**
     * @var array
     */
    protected $filters = [
        'status', 'from', 'to', 'query', 'owner', 'type'
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
        $from = Carbon::parse($value);

        return $this->builder->where('created_at', '>=', $from->format('Y-m-d H:i:s'));
    }

    public function to($value)
    {
        $to = Carbon::parse($value);

        return $this->builder->where('created_at', '<=', $to->format('Y-m-d H:i:s'));
    }

    public function query($value)
    {
        return $this->builder
                    ->where('name', 'LIKE', "%{$value}%")
                    ->orWhere('part_a_wallet', 'LIKE', "%{$value}%")
                    ->orWhere('part_a_name', 'LIKE', "%{$value}%")
                    ->orWhere('part_a_email', 'LIKE', "%{$value}%")
                    ->orWhere('part_b_wallet', 'LIKE', "%{$value}%")
                    ->orWhere('part_b_name', 'LIKE', "%{$value}%")
                    ->orWhere('part_b_email', 'LIKE', "%{$value}%");
    }

    public function type($value)
    {
        if ($value == 'dispute') {
            return $this->builder->where('is_a_dispute', true);
        } elseif ($value == 'friendly') {
            return $this->builder->where('is_a_friendly_resolution', true);
        }
    }
}
