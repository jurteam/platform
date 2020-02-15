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
        $currentStatus = $contract->getCurrentStatus();
        
        return [
            'id' => encodeId($contract->id),
            'statusId' => $currentStatus ? $currentStatus->code : null,
            'statusLabel' => $currentStatus ? $currentStatus->label : null,
            'statusUpdatedAt' => $contract->getCurrentStatusUpdatedAt(),
            'statusFrom' => $contract->getLastStatusFrom(),
            'statusPart' => $contract->getLastStatusPart(),
            'disputeName' => $this->getDisputeName($contract),
            'duration' => (object)[
                'days' => $contract->duration_days,
                'hours' => $contract->duration_hours,
                'minutes' => $contract->duration_minutes
            ],
            'category' => $contract->category,
            'value' => $contract->value,
            'balance' => $contract->balance,
            'earnings' => $contract->getEarnings(),
            'oracle' => $contract->currentWalletIsAnOracle(),
            'hasPenaltyFee' => $contract->has_penalty_fee,
            'partAPenaltyFee' => $contract->part_a_penalty_fee,
            'partBPenaltyFee' => $contract->part_b_penalty_fee
        ];
    }

    protected function getDisputeName(Contract $contract)
    {
        $partNameA = $contract->part_a_name ?: $contract->part_a_wallet;
        $partNameB = $contract->part_b_name ?: $contract->part_b_wallet;

        return "{$partNameA} vs $partNameB - {$contract->name}";
    }
}
