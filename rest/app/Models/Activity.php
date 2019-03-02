<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Activity extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = [
        'readed',
        'to_wallet',
        'message',
        'proposal_part_a',
        'proposal_part_b',
        'status'
    ];

    /**
     * Retrieve contract.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    /**
     * Retrieve owner.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
