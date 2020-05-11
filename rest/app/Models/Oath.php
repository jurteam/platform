<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use \App\Models\OathKeeper;

class Oath extends Model
{
    /**
     * @var array
     */
    protected $fillable = [

    ];

    public $timestamps = true;

    public static function store($data, $oathKeeper)
    {
        $oath = new Oath;

        $oath->wallet = $data->_beneficiary;
        $oath->oath_index = $data->_oathIndex;
        $oath->amount = $data->_amount;
        $oath->lock_in_period = $data->_lockInPeriod;
        $oath->start_at = Carbon::createFromTimestamp($data->_startAt);
        $oath->release_at = Carbon::createFromTimestamp($data->_releaseAt);
        $oath->current_state = 'active';
        $oath->oath_keeper_id = $oathKeeper->id;

        return $oath->save();
    }

    public static function process($payload)
    {
        $oathKeeper = OathKeeper::firstOrCreate(['wallet' => $payload->data->_beneficiary]);

        $saved = Oath::store($payload->data, $oathKeeper);

        return OathKeeper::calculateSummary($oathKeeper);
    }

}
