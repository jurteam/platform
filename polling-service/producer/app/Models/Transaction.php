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
            'asset_name' => $data['assetName'],
            'event_name' => $data['eventName'],
            'contract_address' => $data['contractAddress'],
            'transaction_hash' => $data['transaction']['address'],
            'sender' => $data['transaction']['sender'],
            'timestamp' => Carbon::createFromTimestamp($data['transaction']['timestamp']),
            'block_number' => $data['transaction']['blockNumber'],
            'data' => $data['data']
        ]);
    }
}
