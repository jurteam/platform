<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    public $timestamps = true;

    /**
     * @var array
     */
    protected $fillable = [
        'asset_name',
        'event_name',
        'contract_address',
        'transaction_hash',
        'sender',
        'timestamp',
        'event_name',
        'block_number',
        'data'
    ];

    protected $casts = [
        'data' => 'array'
    ];

    /**
     * Store a transaction
     *
     * @param Object $transaction: object of a transaction
     * @return Transaction Transaction object
     */
    public static function store($data)
    {
        return Transaction::create([
            'asset_name' => $data['asset_name'],
            'event_name' => $data['event_name'],
            'contract_address' => $data['contract_address'],
            'transaction_hash' => $data['transaction_hash'],
            'sender' => $data['sender'],
            'timestamp' => Carbon::createFromTimestamp($data['timestamp']),
            'block_number' => $data['block_number'],
            'data' => $data['data']
        ]);
    }
}
