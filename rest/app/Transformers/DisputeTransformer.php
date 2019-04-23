<?php

namespace App\Transformers;

use App\Models\Contract;
use Illuminate\Http\Request;
use League\Fractal\TransformerAbstract;

class DisputeTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\Contract $contract
     * @return array
     */
    public function transform(Contract $contract)
    {
        return [
            'id' => $contract->id,
            'statusId' => $contract->status ? $contract->status->code : null,
            'statusLabel' => $contract->status ? $contract->status->label : null,
            'statusUpdatedAt' => $contract->getCurrentStatusUpdatedAt(),
            'disputeName' => $this->getDisputeName($contract),
            'duration' => (object)[
                'days' => $contract->duration_days,
                'hours' => $contract->duration_hours,
                'minutes' => $contract->duration_minutes
            ],
            'category' => $contract->category,
            'value' => $contract->value,
            'earnings' => $contract->getEarnings(),
            'oracle' => $contract->currentWalletIsAnOracle()
        ];
    }

    protected function getDisputeName(Contract $contract)
    {
        $partNameA = $contract->part_a_name ?: $contract->part_a_wallet;
        $partNameB = $contract->part_b_name ?: $contract->part_b_wallet;

        return "{$partNameA} vs $partNameB - {$contract->name}";
    }
}
