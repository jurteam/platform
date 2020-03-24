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
            'contract_id' => encodeId($transaction->contract_id),
            'contract_address' => $transaction->contract->address,
        ];
    }

}
//