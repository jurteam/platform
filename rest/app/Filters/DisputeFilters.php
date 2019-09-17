<?php

namespace App\Filters;

use Carbon\Carbon;

class DisputeFilters extends Filters
{
    protected $filters = [
        'show',
        'status',
        'category',
        'from',
        'to',
        'query',
        'orderBy'
    ];

    protected $orderBy = [
        'name',
        'category',
        'value'
    ];

    public function category($value)
    {
        return $this->builder->where('category', $value);
    }

    public function show($value)
    {
        $query = $this->builder
                        ->where('contracts.is_a_dispute', true);

        if ($value == 'my') {
            $lowerWallet = strtolower($this->request->header('wallet'));
            $query->whereRaw(
                '(LOWER(contracts.part_a_wallet) = ? OR LOWER(contracts.part_b_wallet) = ?)',
                [$lowerWallet,$lowerWallet]
            );
        }

        return $query;
    }

    public function status($value)
    {
        return $this->builder
                    ->join(
                        'contract_status_histories',
                        'contract_status_histories.contract_id', '=', 'contracts.id'
                    )
                    ->join(
                        'contract_statuses',
                        'contract_statuses.id', '=', 'contract_status_histories.contract_status_id'
                    )
                    ->whereRaw(
                        'contract_statuses.code = ?
                        AND (contract_status_histories.chain_updated_at IS NULL
                            OR NOW() >= contract_status_histories.chain_updated_at)',
                        [$value]
                    );
    }

    public function from($value)
    {
        $from = Carbon::parse($value)->startOfDay();
        return $this->builder->where('contracts.created_at', '>=', $from->format('Y-m-d H:i:s'));
    }

    public function to($value)
    {
        $to = Carbon::parse($value)->endOfDay();
        return $this->builder->where('contracts.created_at', '<=', $to->format('Y-m-d H:i:s'));
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
                    ->orWhere('contracts.part_b_email', 'LIKE', "%{$value}%");
    }

    /**
     * Order by disputes by args.
     *
     * @param  array $value
     * @return Builder
     */
    public function orderBy($value)
    {
        $query = $this->builder;

        foreach ($value as $field => $ordering) {
            if (in_array($field, $this->orderBy)) {
                $query->orderBy("contracts.{$field}", $ordering);
            }
        }
        return $query;
    }
}
