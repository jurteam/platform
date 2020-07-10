<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RewardUnAssignedSlot extends Model
{

    /**
     * @return slots : one to many relation
     */
    public function slots()
    {
        return $this->belongsTo('App\Models\Slot');
    }

}
