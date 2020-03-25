<?php

namespace App\Transformers;

use App\Models\Transaction;
use League\Fractal\TransformerAbstract;

class TransactionTransformer extends TransformerAbstract
{

    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\Contract $contract
     * @return array
     */
    public function transform(Transaction $transaction)
    {

        return [
            'id' => $transaction->id,
            'txid' => $transaction->txid,
            'event' => $transaction->event,
            'wallet' => $transaction->wallet,
            'param' => $transaction->param,
            'contract' => (object)[
                'id' => encodeId($transaction->contract_id),
                'address' => $transaction->contract->address,
                'value' => $transaction->contract->value,
                'who_pays' => $transaction->contract->who_pays,
                'part_a_penalty_fee' => $transaction->contract->part_a_penalty_fee,
                'part_b_penalty_fee' => $transaction->contract->part_b_penalty_fee,
                'counterparties' => [
                    (object)[
                        'wallet' => $transaction->contract->part_a_wallet,
                    ],
                    (object)[
                        'wallet' => $transaction->contract->part_b_wallet,
                    ]
                ],
            ],
            // 'contract_complete' => $transaction->contract
        ];
    }

}
//