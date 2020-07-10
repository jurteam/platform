<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleContract extends Model
{

    /**
     * @var array
     */
    protected $fillable = [
        'contract_address'
    ];

    /**
     * @return role_contracts : many to many relation
     */
    public function rewardActivities()
    {
        return $this->belongsToMany('App\Models\RewardActivity', 'reward_activities');
    }

    /**
     * Store/Update user-contract when `roleContractUpdated` event triggered
     *
     * @param Object $payload: payload  send by Smart-Contract event
     * @return Boolean the success or failure message
     */
    public static function roleContractUpdated($payload)
    {
        // get data object
        $data = $payload->data;

        $roleContract = RoleContract::firstOrCreate(['contract_address' => $data->contractAddress]);
        $roleContract->contract_address = $data->contractAddress;
        $roleContract->role = $data->role;
        $roleContract->is_active = $data->status;

        return $roleContract->save();
    }
}
