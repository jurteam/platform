<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    public $timestamps = true;

    protected $casts = [
        'data' => 'array'
    ];

    /**
     * Store a transaction
     *
     * @param Transaction $transaction: object of a transaction
     * @return Boolean success or failure status
     */
    public static function store($data)
    {
        $transaction = new Transaction;

        $transaction->asset_name = $data['assetName'];
        $transaction->event_name = $data['eventName'];
        $transaction->contract_address = $data['contractAddress'];
        $transaction->transaction_hash = $data['transaction']['address'];
        $transaction->sender = $data['transaction']['sender'];
        $transaction->timestamp = Carbon::createFromTimestamp($data['transaction']['timestamp']);
        $transaction->block_number = $data['transaction']['blockNumber'];
        $transaction->data = $data['data'];

        return $transaction->save();
    }
}
