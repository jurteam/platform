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
                ->selectRaw('contracts.*, (SELECT
                        contract_status_histories.contract_status_code
                    FROM
                        contract_status_histories
                    WHERE
                        contract_status_histories.contract_id = contracts.id
                    ORDER BY IF(contract_status_histories.chain_updated_at IS NULL,
                        contract_status_histories.created_at, IF (contract_status_histories.chain_updated_at > NOW(), NULL, contract_status_histories.chain_updated_at)) DESC
                    LIMIT 1) AS current_status, (SUM(contracts.value) + SUM(contracts.part_a_penalty_fee) + SUM(contracts.part_b_penalty_fee))'
                )
                ->where('contracts.is_a_dispute', true);

        if ($value == 'my') {
            $lowerWallet = strtolower($this->request->header('wallet'));
            $query->whereRaw(
                '(LOWER(contracts.part_a_wallet) = ? OR LOWER(contracts.part_b_wallet) = ?)',
                [$lowerWallet,$lowerWallet]
            );
        }

        return $query
                ->havingRaw('current_status <> ?', [31])
                ->groupBy('contracts.id');
    }

    public function status($value)
    {
        return $this->builder->havingRaw('current_status IS NOT NULL AND current_status = ? AND current_status <> ?', [$value, 31]);
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
                    ->orWhere('contracts.part_a_name', 'LIKE', "%{$value}%")
                    ->orWhere('contracts.part_a_email', 'LIKE', "%{$value}%")
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
                if ($field == 'value') {
                    $query->orderBy("real_value", $ordering);
                } else {
                    $query->orderBy("contracts.{$field}", $ordering);
                }
            }
        }
        return $query;
    }
}
