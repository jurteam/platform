<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Log;

class Advocate extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'wallet'
    ];

    /**
     * Store an advocate when `AdvocateAdded` event triggered
     *
     * @param Object $payload: payload  send by Smart-Contract event
     * @return Boolean the success or failure message
     */
    public static function advocateAdded($payload)
    {
        // get data object
        $data = $payload->data;

        // Check record exisits
        $exists = Advocate::where('wallet', $data->wallet)->where('contract_address', $payload->contract_address)->first();

        // ignore creation if already exists
        if (isset($exists)) {
            Log::warning('The Advocate with wallet `' . $data->wallet . '` already exists in the database.');
            return false;
        }

        // create the user if not exists
        $user = User::firstOrCreate(['wallet' => $data->wallet]);

        // Save advocate
        $advocate = Advocate::firstOrCreate(['wallet' => $data->wallet]);
        $advocate->wallet = $data->wallet;
        $advocate->contract_address = $data->contract_address;
        $advocate->activation_time = Carbon::createFromTimestamp($data->activationTime);
        $advocate->is_active = true;
        $advocate->type = $data->advocateType;

        return $advocate->save();
    }

    /**
     * Update state of an advocate when `AdvocateStateUpdated` event triggered
     *
     * @param Object $payload: payload  send by Smart-Contract event
     * @return Boolean the success or failure message
     */
    public static function advocateStateUpdated($payload)
    {
        // get data object
        $data = $payload->data;

        // Check record exisits
        $advocate = Advocate::where('wallet', $data->wallet)->firstOrFail();
        $advocate->wallet = $data->wallet;
        $advocate->is_active = $data->newState;

        return $advocate->save();
    }

    /**
     * Update type of an advocate when `AdvocateTypeUpdated` event triggered
     *
     * @param Object $payload: payload  send by Smart-Contract event
     * @return Boolean the success or failure message
     */
    public static function advocateTypeUpdated($payload)
    {
        // get data object
        $data = $payload->data;

        // Check record exisits
        $advocate = Advocate::where('wallet', $data->wallet)->firstOrFail();
        $advocate->type = $data->advocateType;

        return $advocate->save();
    }
}
