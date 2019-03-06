<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContractStatus extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'label',
        'code',
        'background_color',
        'text_color'
    ];

    public $timestamps = false;

    public function scopeByCode($query, $code)
    {
        return $query->where('code', $code);
    }
}
