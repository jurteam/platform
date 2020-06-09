<?php

namespace App\Filters;

use \App\Models\Oath;
use Carbon\Carbon;

class OathKeeperFilters extends Filters
{
    private $startsAt;

    private $endsAt;

    private $status;

    protected $filters = [
        'minAmount',
        'maxAmount',
        'startsAt',
        'endsAt',
        'status',
        'query',
        'sortBy'
    ];

    protected $sortBy = [
        'Rank' => ['rank', 'asc'],
        'Amount' => ['total_amount', 'asc'],
        'OathCount' => ['active_oath_count', 'asc'],
        '-Rank' => ['rank', 'desc'],
        '-Amount' => ['total_amount', 'desc'],
        '-OathCount' => ['active_oath_count', 'desc']
    ];

    protected $defaults = [
        'sortBy' => 'Rank',
        'status' => 'All'
    ];

    public function minAmount($value)
    {
        return $this->builder->where('total_amount', '>=', $value);
    }

    public function maxAmount($value)
    {
        return $this->builder->where('total_amount', '<=', $value);
    }

    public function status($value)
    {
        $query = $this->builder;

        if ($value == 'Active') {
            $query->whereIn('id',
                Oath::where('current_state', 'active')
                    ->pluck('oath_keeper_id')
            );
        } elseif ($value == 'Past') {
            $query->whereIn('id',
                Oath::where('current_state', 'complete')
                    ->orWhere('current_state', 'withdrawn')
                    ->pluck('oath_keeper_id')
            );
        }

        $this->status = $value;

        $this->processDateFilter();

        return $query;
    }

    public function startsAt($value)
    {
        $this->startsAt = Carbon::parse($value)->startOfDay();
        $this->processDateFilter();
    }

    public function endsAt($value)
    {
        $this->endsAt = Carbon::parse($value)->endOfDay();
        $this->processDateFilter();
    }

    private function processDateFilter()
    {

        if (!(isset($this->startsAt) && isset($this->endsAt) && isset($this->status))) {
            return;
        }

        $query = $this->builder;

        switch ($this->status) {

            // Get all Oaths unlocked in the selected duration
            case 'Past':

                $query->whereIn('id',
                    Oath::where('release_at', '<', $this->endsAt)
                        ->where('release_at', '>', $this->startsAt)
                        ->pluck('oath_keeper_id')
                );
                break;

            // Get all active oaths in the selected duration
            case 'Active':

                $query->whereNotIn('id',
                    Oath::where('start_at', '>', $this->endsAt)
                        ->orWhere('release_at', '<', $this->startsAt)
                        ->pluck('oath_keeper_id')
                );
                break;

            default:

                $query->whereIn('id',
                    Oath::where('release_at', '<', $this->endsAt)
                        ->where('release_at', '>', $this->startsAt)
                        ->pluck('oath_keeper_id')
                )
                    ->orWhereNotIn('id',
                        Oath::where('start_at', '>', $this->endsAt)
                            ->orWhere('release_at', '<', $this->startsAt)
                            ->pluck('oath_keeper_id')
                    );
                break;
        }

        return $query;
    }

    public function sortBy($key)
    {

        $result = isset($this->sortBy[$key]) ? $this->sortBy[$key] : ['rank', 'asc'];

        return $this->builder->orderBy($result[0], $result[1]);

    }

    public function query($value)
    {
        return $this->builder
            ->where('wallet', 'LIKE', "%{$value}%");
    }
}
