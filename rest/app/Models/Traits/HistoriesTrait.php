<?php

namespace App\Models\Traits;

use Carbon\Carbon;
use App\Models\ContractStatus;
use App\Models\ContractStatusHistory;

trait HistoriesTrait
{
    public function getCurrentStatus()
    {
        $this->load('histories');
        if ($this->histories->count() > 0) {
            $history = $this->histories
                ->filter(function($item) {
                    return !is_null($item->custom_status_date);
                })
                ->sortByDesc('custom_status_date')
                ->first();

            if (!empty($history)) {
                return $history->status;
            }
        }

        return null;
    }

    public function getCurrentHistory()
    {
        $this->load('histories');
        if ($this->histories->count() > 0) {
            $history = $this->histories
                ->filter(function($item) {
                    return !is_null($item->custom_status_date);
                })
                ->sortByDesc('custom_status_date')
                ->first();

            return $history;
        }

        return null;
    }

    public function getOpeningDate()
    {
        $this->load('histories');
        if ($this->histories->count() > 0) {
            $history = $this->histories
                ->filter(function($item) {
                    return (!is_null($item->custom_status_date) && $item->contract_status_code === 5);
                })
                ->first();

            return $history;
        }

        return null;
    }

    public function getOpeningVotingSessionDate()
    {
        $this->load('histories');
        if ($this->histories->count() > 0) {
            $history = $this->histories
                ->filter(function($item) {
                    return $item->contract_status_code === 35;
                })
                ->first();

            return $history->chain_updated_at;
        }

        return null;
    }

    /**
     * Record status histories for contract.
     *
     * @param  string $date
     * @param  \App\Models\ContractStatus $status
     * @return void
     */
    public function recordHistories($date, ContractStatus $status)
    {
        $date = $date ? Carbon::createFromTimestamp($date) : null;

        $this->load('histories');

        if ($status->shouldUpdate()) {
            $futureHistory = $this->histories
                ->filter(function($history) {
                    if (! empty($history->chain_updated_at)) {
                        return $history->chain_updated_at->isFuture();
                    }
                    return false;
                })->filter(function($history) use($status) {
                    return $history->contract_status_id == $status->id;
                })->last();

            if (! empty($futureHistory)) {
                $futureHistory->update([
                    'chain_updated_at' => $date
                ]);
            } elseif (empty($futureHistory)) {
                $pastHistory = $this->histories->filter(function($history) use($status) {
                    return $history->contract_status_id == $status->id;
                })->last();

                if (empty($pastHistory)) {
                    $this->createHistory($status, $date);
                }
            } else {
                $this->createHistory($status, $date);
            }
        } else {
            $this->createHistory($status, $date);
        }
    }

    protected function createHistory($status, $date)
    {
        $this->histories()
            ->save(new ContractStatusHistory([
                'contract_status_code' => $status->code,
                'contract_status_id' => $status->id,
                'chain_updated_at' => $date
            ]));
    }
}
