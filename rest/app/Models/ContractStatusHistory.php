<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContractStatusHistory extends Model
{
    protected $fillable = [
        'chain_updated_at',
        'contract_status_id'
    ];

    protected $dates = [
        'chain_updated_at'
    ];

    public function getUpdatedDate()
    {
        if (! empty($this->chain_updated_at)) {
            if (!$this->chain_updated_at->isFuture()) {
                return $this->chain_updated_at->valueOf();
            }
        }
        return $this->created_at->valueOf();
    }

    public function isPast()
    {
        if (! empty($this->chain_updated_at)) {
            return $this->chain_updated_at->isPast();
        }
        return $this->created_at->isPast();
    }

    public function status()
    {
        return $this->belongsTo(ContractStatus::class, 'contract_status_id');
    }
}
