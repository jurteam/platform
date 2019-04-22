<?php

namespace App\Filters;

use Carbon\Carbon;

class ContractFilters extends Filters
{
    /**
     * @var array
     */
    protected $filters = [
        'status',
        'from',
        'to',
        'query',
        'owner',
        'type',
        'wallet',
        'orderBy'
    ];

    public function orderBy($value)
    {
        $query = $this->builder;
        foreach ($value as $field => $ordering) {
            $query->orderBy("contracts.{$field}", $ordering);
        }
        return $query;
    }

    public function wallet($value)
    {
        $lowerWallet = strtolower($value);

        return $this->builder
                    ->select('contracts.*')
                    ->join('contract_statuses', 'contract_statuses.id', '=', 'contracts.contract_status_id')
                    ->whereRaw(
                        '(LOWER(contracts.part_a_wallet) = ?
                        OR IF (LOWER(contracts.part_b_wallet) = ? AND contract_statuses.code <> ?, 1, 0))',
                        [$lowerWallet, $lowerWallet, 0]
                    );
    }

    public function owner($value)
    {
        return $this->builder->whereUserId($value);
    }

    public function status($value)
    {
        return $this->builder
                    ->join('contract_statuses', 'contract_statuses.id', '=', 'contracts.contract_status_id')
                    ->where('contract_statuses.code', $value);
    }

    public function from($value)
    {
        $from = Carbon::parse($value)->startOfDay();
        return $this->builder->where('created_at', '>=', $from->format('Y-m-d H:i:s'));
    }

    public function to($value)
    {
        $to = Carbon::parse($value)->endOfDay();
        return $this->builder->where('created_at', '<=', $to->format('Y-m-d H:i:s'));
    }

    public function query($value)
    {
        $lowerWallet = strtolower($value);

        return $this->builder
                    ->where('contracts.name', 'LIKE', "%{$value}%")
                    ->orWhereRaw('LOWER(contracts.part_a_wallet) = ?', [$lowerWallet])
                    ->orWhere('contracts.part_a_name', 'LIKE', "%{$value}%")
                    ->orWhere('contracts.part_a_email', 'LIKE', "%{$value}%")
                    ->orWhereRaw('LOWER(contracts.part_b_wallet) = ?', [$lowerWallet])
                    ->orWhere('contracts.part_b_name', 'LIKE', "%{$value}%")
                    ->orWhere('contracts..part_b_email', 'LIKE', "%{$value}%");
    }

    public function type($value)
    {
        if ($value == 'dispute') {
            return $this->builder->where('contracts.is_a_dispute', 1);
        } elseif ($value == 'friendly') {
            return $this->builder->where('contracts.is_a_friendly_resolution', 1);
        }
    }
}
