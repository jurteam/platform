<?php

namespace App\Models\Traits;

use App\Models\ContractStatus;
use App\Models\ContractStatusHistory;

trait HistoriesTrait
{
    public function getCurrentStatus()
    {
        $this->load('histories');

        if ($this->histories->count() > 0) {
            $history = $this->histories->filter(function($history) {
                if ($history->chain_updated_at) {
                    return ! $history->chain_updated_at->isFuture();
                }
                return ! $history->created_at->isFuture();
            })->last();
            
            return $history->status;
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
                return $history->contract_status_id == $status->id;
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
