<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Log;
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
     * @param Object $data: payload data send by Polling server
     * @param OathKeeper $oathKeeper: Object of the OathKeeper
     * @return Boolean the success or failure message
     */
    public static function store($data, $oathKeeper)
    {
        $exists = Oath::where('wallet', $data->_beneficiary)->where('oath_index', $data->_oathIndex)->first();

        if (isset($exists)) {
            Log::warning('The oath of wallet `' . $data->_beneficiary . '` with index `' . $data->_oathIndex . '` already exists in the database.');
            return false;
        }

        $oath = new Oath;

        $oath->wallet = $data->_beneficiary;
        $oath->oath_index = $data->_oathIndex;
        $oath->amount = ((float) ($data->_amount)) / pow(10, 18);
        $oath->lock_in_period = $data->_lockInPeriod;
        $oath->start_at = Carbon::createFromTimestamp($data->_startAt);
        $oath->release_at = Carbon::createFromTimestamp($data->_releaseAt);
        $oath->current_state = 'active';
        $oath->oath_keeper_id = $oathKeeper->id;

        $oath->save();

        return $oath;
    }

    /**
     * Upadte an oath to mark oathWithrawn based on $payload object
     *
     * @param Object $payload: payload  send by Polling server
     * @return Boolean the success or failure message
     */
    public static function withrawn($payload)
    {
        $oath = Oath::where([
            'wallet' => $payload->data->_beneficiary,
            'oath_index' => $payload->data->_oathIndex
        ])->first();

        if (!$oath) {
            Log::notice("Received an oath's withdraw which is not in the database. _beneficiary:" . $payload->data->_beneficiary . " _oathIndex:" . $payload->data->_oathIndex);
            return false;
        }

        $oath->withdrawn_at = Carbon::createFromTimestamp($payload->timestamp);
        $oath->current_state = 'withdrawn';

        return $oath->save();
    }
}
