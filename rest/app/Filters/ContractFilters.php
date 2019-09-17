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
                    ->whereRaw(
                        'LOWER(contracts.part_a_wallet) = ? OR LOWER(contracts.part_b_wallet) = ?',
                        [$lowerWallet,$lowerWallet]
                    );
    }

    public function owner($value)
    {
        return $this->builder->whereUserId($value);
    }

    public function status($value)
    {
        $lowerWallet = strtolower($this->request->header('wallet'));

        $query = $this->builder
                    ->join(
                        'contract_status_histories',
                        'contract_status_histories.contract_id', '=', 'contracts.id'
                    )
                    ->join(
                        'contract_statuses',
                        'contract_statuses.id', '=', 'contract_status_histories.contract_status_id'
                    );

        if ($value == 0) {
            $query = $query->whereRaw(
                'contract_statuses.code = ?
                AND (contract_status_histories.chain_updated_at IS NULL
                    OR NOW() >= contract_status_histories.chain_updated_at)
                AND contracts.id IN (SELECT id FROM contracts WHERE part_a_wallet = ?)',
                [$value, $lowerWallet]
            );
        } else {
            $query = $query->whereRaw('contract_statuses.code = ?', [$value]);
        }

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
