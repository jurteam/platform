<?php

namespace App\Filters;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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
            if ($field == 'value') {
                $query->orderBy("real_value", $ordering);
            } else {
                $query->orderBy("contracts.{$field}", $ordering);
            }
        }
        return $query;
    }

    public function wallet($value)
    {
        $lowerWallet = strtolower($value);

        return $this->builder
                    ->selectRaw('contracts.*, (SELECT
                            contract_status_histories.contract_status_code
                        FROM
                            contract_status_histories
                        WHERE
                            contract_status_histories.contract_id = contracts.id
                            AND IF(contract_status_histories.chain_updated_at IS NULL, 1,
                            IF(NOW() > contract_status_histories.chain_updated_at, 1, 0)) = 1
                        ORDER BY contract_status_histories.id DESC
                        LIMIT 1) AS current_status, (SUM(contracts.value) + SUM(contracts.part_a_penalty_fee) + SUM(contracts.part_b_penalty_fee)) AS real_value'
                    )
                    ->orWhereRaw('LOWER(contracts.part_a_wallet) = ?', [$lowerWallet])
                    ->where('contracts.is_a_dispute', false)
                    ->groupBy('contracts.id');
    }

    public function owner($value)
    {
        return $this->builder->whereUserId($value);
    }

    public function status($value)
    {
        $lowerWallet = strtolower($this->request->header('wallet'));
        $query = $this->builder;

        if ($value != 0) {
            $query->orWhereRaw('LOWER(contracts.part_b_wallet) = ?', [$lowerWallet]);
        }

        $query->havingRaw('current_status = ?', [$value]);
        return $query;
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
            return $this->builder->where('contracts.is_a_dispute', true);
        } elseif ($value == 'friendly') {
            return $this->builder->where('contracts.is_a_friendly_resolution', true);
        }
    }
}
