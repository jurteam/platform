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
    public static function UserContractUpdated($payload)
    {
        $userContract = UserContract::firstOrCreate(['sc_user_contract_id' => $payload->id]);
        $userContract->sc_user_contract_id = $payload->id;
        $userContract->contract_address = $payload->address;
        $userContract->name = $payload->name;
        $userContract->is_active = $payload->state;

        return $userContract->save();
    }
}
