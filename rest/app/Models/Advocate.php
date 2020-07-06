<?php

namespace App\Models;

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
        // Check record exisits
        $exists = Advocate::where('wallet', $payload->wallet)->first();

        // ignore creation if already exists
        if (isset($exists)) {
            Log::warning('The Advocate with wallet `' . $payload->wallet . '` already exists in the database.');
            return false;
        }

        // Save new advocate
        $advocate = new Advocate;
        $advocate->wallet = $payload->wallet;
        $advocate->activation_time = $payload->activation_time;
        $advocate->is_active = true;
        $advocate->type = $payload->advocateType;

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
        // Check record exisits
        $advocate = Advocate::where('wallet', $payload->wallet)->firstOrFail();
        $advocate->wallet = $payload->wallet;
        $advocate->is_active = $payload->newState;

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
        // Check record exisits
        $advocate = Advocate::where('wallet', $payload->wallet)->firstOrFail();
        $advocate->wallet = $payload->wallet;
        $advocate->type = $payload->newType;

        return $advocate->save();
    }
}
