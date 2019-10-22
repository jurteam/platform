<?php

namespace App\Models\Traits;

use App\Models\ContractStatus;
use App\Models\ContractStatusHistory;
use Carbon\Carbon;

trait HistoriesTrait
{
    public function getCurrentStatus()
    {
        $this->load('histories');

        if ($this->histories->count() > 0) {
            $history = $this->histories
                        ->sortByDesc('custom_status_date')
                        ->first();

            if (!empty($history)) {
                return $history->status;
            }
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
                $this->histories()
                    ->save(new ContractStatusHistory([
                        'contract_status_code' => $status->code,
                        'contract_status_id' => $status->id,
                        'chain_updated_at' => $date
                    ]));
            }
        } else {
            $this->histories()
                ->save(new ContractStatusHistory([
                    'contract_status_code' => $status->code,
                    'contract_status_id' => $status->id,
                    'chain_updated_at' => $date
                ]));
        }
    }
}
