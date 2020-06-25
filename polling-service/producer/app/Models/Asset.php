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
        'abi',
        'default_from_block'
    ];

    protected $casts = [
        'abi' => 'array'
    ];

    public $timestamps = true;

}
