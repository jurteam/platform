<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionStates extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'instance_id',
        'service_name',
        'last_read_block'
    ];

    public $timestamps = true;
}
