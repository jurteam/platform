<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserContract extends Model
{
    /**
     * Store/Update user-contract when `UserContractUpdated` event triggered
     *
     * @param Object $payload: payload  send by Smart-Contract event
     * @return Boolean the success or failure message
     */
    public static function userContractUpdated($payload)
    {
        // get data object
        $data = $payload->data;

        $userContract = UserContract::firstOrCreate(['sc_user_contract_id' => $data->id]);
        $userContract->sc_user_contract_id = $data->id;
        $userContract->contract_address = $data->address;
        $userContract->name = $data->name;
        $userContract->is_active = $data->state;

        return $userContract->save();
    }
}
