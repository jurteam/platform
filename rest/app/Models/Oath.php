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

    /**
     * Create an oath based on $data object
     *
     * @param Object $data: payload data send by AMQP server
     * @param OathKeeper $oathKeeper: Object of the OathKeeper
     * @return Boolean the success or failure message
     */
    public static function store($data, $oathKeeper)
    {
        $oath = new Oath;

        // Get fiat value of JUR/VET
        $JurVet = json_decode(file_get_contents('https://api.oceanex.pro/v1/tickers/jurvet'), true);
        $ticker = $JurVet['data']['ticker'];

        // Find Average of fiat value
        $lowFiatValue = $ticker['low'];
        $highFiatValue = $ticker['high'];
        $averageFiatValue = ($lowFiatValue + $highFiatValue) / 2;

        $oath->wallet = $data->_beneficiary;
        $oath->oath_index = $data->_oathIndex;
        $oath->amount = ((float) ($data->_amount)) / pow(10, 18);
        $oath->lock_in_period = $data->_lockInPeriod;
        $oath->start_at = Carbon::createFromTimestamp($data->_startAt);
        $oath->release_at = Carbon::createFromTimestamp($data->_releaseAt);
        $oath->current_state = 'active';
        $oath->oath_keeper_id = $oathKeeper->id;
        $oath->fiat_value = $averageFiatValue;

        return $oath->save();
    }

    /**
     * Upadte an oath to mark oathWithrawn based on $payload object
     *
     * @param Object $payload: payload  send by AMQP server
     * @return Boolean the success or failure message
     */
    public static function withrawn($payload)
    {
        $oath = Oath::where([
            'wallet' => $payload->data->_beneficiary,
            'oath_index' => $payload->data->_oathIndex
        ])->first();

        $oath->withdrawn_at = Carbon::createFromTimestamp($payload->transaction->timestamp);
        $oath->current_state = 'withdrawn';

        return $oath->save();
    }
}
