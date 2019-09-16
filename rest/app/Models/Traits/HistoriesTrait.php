<?php

namespace App\Models\Traits;

use App\Models\ContractStatus;
use App\Models\ContractStatusHistory;

trait HistoriesTrait
{
    public function getCurrentStatus()
    {
        if ($this->histories->count() > 0) {
            return $this->histories->filter(function($history) {
                if ($history->chain_updated_at) {
                    return ! $history->chain_updated_at->isFuture();
                }
                return $history;
            })->last();
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
        $history = $this->histories
            ->filter(function($history) use($status) {
                if ($history->chain_updated_at) {
                    return $history->chain_updated_at->isFuture()
                        && $history->contract_status_id == $status->id;
                }
                return $history;
            })
            ->last();

        if (! empty($history)) {
            $history->update([
                'chain_updated_at' => $date
            ]);
        } else {
            $this->histories()
                ->save(new ContractStatusHistory([
                    'contract_status_id' => $status->id,
                    'chain_updated_at' => $date
                ]));
        }
    }
}
