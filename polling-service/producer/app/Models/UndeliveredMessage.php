<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UndeliveredMessage extends Model
{

    /**
     * @var array
     */
    protected $fillable = [
        'transaction_id',
        'consumer_id',
        'error_code',
        'error_message',
        'retries',
        'next_try_at',
        'status'
    ];

    /**
     * @return transaction : one to one relation
     */
    public function transaction()
    {
        return $this->belongsTo('App\Models\Transaction');
    }

    /**
     * @return consumer : one to one relation
     */
    public function consumer()
    {
        return $this->belongsTo('App\Models\Consumer');
    }
}
