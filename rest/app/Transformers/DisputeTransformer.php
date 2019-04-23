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
        $duration = $contract->getDisputeDuration();

        return [
            'id' => $contract->id,
            'statusId' => $contract->status ? $contract->status->code : null,
            'statusLabel' => $contract->status ? $contract->status->label : null,
            'statusUpdatedAt' => $contract->getCurrentStatusUpdatedAt(),
            'disputeName' => $contract->name,
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
}
