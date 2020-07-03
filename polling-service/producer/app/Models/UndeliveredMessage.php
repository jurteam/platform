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
}
