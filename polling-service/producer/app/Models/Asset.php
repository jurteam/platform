<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'asset_name',
        'contract_address',
        'event_name',
        'event_abi',
        'default_from_block'
    ];

    public $timestamps = true;
}