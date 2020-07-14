<?php

namespace App\Transformers;

use App\Models\Transaction;
use Carbon\Carbon;
use League\Fractal\TransformerAbstract;

class TransactionTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\Status $status
     * @return array
     */
    public function transform(Transaction $transaction)
    {
        return [
            'asset_name' => $transaction->asset_name,
            'event_name' => $transaction->event_name,
            'contract_address' => $transaction->contract_address,
            'block_number' => $transaction->block_number,
            'transaction_hash' => $transaction->transaction_hash,
            'sender' => $transaction->sender,
            'timestamp' => Carbon::createFromDate($transaction->timestamp)->timestamp,
            'data' => $transaction->data
        ];
    }

}
