<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class ContractStatusDetail extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = [
        'message',
        'contract_part',
        'contract_proposal',
        'payed_at'
    ];

    /**
     * @var array
     */
    protected $dates = [
        'payed_at'
    ];

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }
}
