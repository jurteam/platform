<?php

namespace App\Transformers;

use App\Models\Withdrawal;
use League\Fractal\TransformerAbstract;

class WithdrawalTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\Withdrawal $contract
     * @return array
     */
    public function transform(Withdrawal $withdrawal)
    {
        return [
            'id' => $withdrawal->id,
            'date' => $withdrawal->created_at->valueOf(),
            'contract_name' => $withdrawal->contract->name,
            'contract' => $withdrawal->contract_id,
            'amount' => $withdrawal->amount,
            'type' => $withdrawal->type,
            'wallet' => $withdrawal->wallet
        ];
    }
}
