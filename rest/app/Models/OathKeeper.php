<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \App\Models\Oath;

class OathKeeper extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'wallet'
    ];

    public $timestamps = true;

    public function scopeFilters($query, $filters)
    {
        return $filters->apply($query);
    }

    public static function calculateSummary(OathKeeper $oathKeeper)
    {
        $total_amount = 0;
        $active_amount = 0;
        $active_oath_count = 0;
        $total_oath_count = 0;

        // Get all other oaths for the specified wallet
        $rows = Oath::where(['wallet' => $oathKeeper->wallet])
            ->select('amount', 'current_state')
            ->get();

        // Calculate sum of total and active amounts
        foreach ($rows as &$row) {
            if ($row->current_state == 'active') {
                $active_amount = $active_amount + $row->amount;
                $active_oath_count = $active_oath_count + 1;
            }
            $total_amount = $total_amount + $row->amount;
            $total_oath_count = $total_oath_count + 1;
        }

        // Store calculated values
        $oathKeeper->total_amount = $total_amount;
        $oathKeeper->active_amount = $active_amount;
        $oathKeeper->active_oath_count = $active_oath_count;
        $oathKeeper->total_oath_count = $total_oath_count;
        return $oathKeeper->save();
    }
}
