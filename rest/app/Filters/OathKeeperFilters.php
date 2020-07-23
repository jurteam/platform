<?php

namespace App\Filters;

use Carbon\Carbon;
use \App\Models\Oath;

class OathKeeperFilters extends Filters
{
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
        'OathCount' => ['total_oath_count', 'asc'],
        '-Rank' => ['rank', 'desc'],
        '-Amount' => ['total_amount', 'desc'],
        '-OathCount' => ['total_oath_count', 'desc']
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

        $startsAt = Carbon::parse($this->request->get('startsAt', Carbon::createFromTimestamp(0)))->startOfDay()->format('Y-m-d H:i:s');
        $endsAt = Carbon::parse($this->request->get('endsAt', Carbon::now()))->endOfDay()->format('Y-m-d H:i:s');

        switch ($value) {

            case 'All': // Get all Oaths between selected duration

                $query->whereNotIn('id',
                    Oath::where('start_at', '>', $endsAt) // This will remove all oaths that started after the duration
                        ->orWhere('release_at', '<', $startsAt) // This will remove all oaths that ended before the duration
                        ->orWhere(function ($q) use ($startsAt, $endsAt) { // This will remove all oaths that doesn't started nor released in the duration
                            $q->where('start_at', '<', $startsAt)
                                ->where('release_at', '>', $endsAt);
                        })
                        ->pluck('oath_keeper_id')
                );

                break;

            case 'Active': // Get all oaths that is active in the selected duration

                if ($startsAt == Carbon::createFromTimestamp(0)->startOfDay()->format('Y-m-d H:i:s')) {
                    $query->whereIn('id',
                        Oath::where('current_state', 'active')
                            ->pluck('oath_keeper_id')
                    );
                } else {
                    $query->whereNotIn('id',
                        Oath::where('start_at', '>', $endsAt)
                            ->orWhere('release_at', '<', $startsAt)
                            ->pluck('oath_keeper_id')
                    );
                }

                break;

            case 'Past': // Get all Oaths released in the selected duration

                $query->whereIn('id',
                    Oath::where(function ($q) {
                        $q->where('current_state', 'complete')->orWhere('current_state', 'withdrawn');
                    })
                        ->where('release_at', '>=', $startsAt)
                        ->where('release_at', '<=', $endsAt)
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
