<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Advocate extends Model
{
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
        $exists = Advocate::where('wallet', $data->wallet)->first();

        // ignore creation if already exists
        if (isset($exists)) {
            Log::warning('The Advocate with wallet `' . $data->wallet . '` already exists in the database.');
            return false;
        }

        // Save new advocate
        $advocate = new Advocate;
        $advocate->wallet = $data->wallet;
        $advocate->activation_time = Carbon::createFromTimestamp($data->activation_time);
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
        $advocate->wallet = $data->wallet;
        $advocate->type = $data->newType;

        return $advocate->save();
    }
}
