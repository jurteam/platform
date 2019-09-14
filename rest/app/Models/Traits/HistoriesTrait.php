<?php

namespace App\Models\Traits;

use App\Models\ContractStatus;
use App\Models\ContractStatusHistory;

trait HistoriesTrait
{
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
                return $history->chain_updated_at->isFuture()
                    && $history->contract_status_id == $status->id;
            });

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
