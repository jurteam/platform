<?php

namespace App\Models;

use App\Models\RewardActivityRole;
use Illuminate\Database\Eloquent\Model;
use Log;
use \App\Jobs\NotifyNewRewardActivityAvailable;

class RewardActivity extends Model
{

    /**
     * @return role_contracts : many to many relation
     */
    public function roleContracts()
    {
        return $this->belongsToMany('App\Models\RoleContract', 'reward_activity_roles');
    }

    /**
     * Store reward-activity when `ActivityCreated` event triggered
     *
     * @param Object $payload: payload  send by Smart-Contract event
     * @return Boolean the success or failure message
     */
    public static function activityCreated($payload)
    {
        // get data object
        $data = $payload->data;

        // Check record exisits
        $exists = RewardActivity::where('sc_activity_id', $data->activityId)->first();

        // ignore creation if already exists
        if (isset($exists)) {
            Log::warning('The RewardActivity with id `' . $data->activityId . '` already exists in the database.');
            return false;
        }

        // Save RewardActivity
        $rewardActivity = new RewardActivity;
        $rewardActivity->sc_activity_id = $data->activityId;
        $rewardActivity->name = $data->name;
        $rewardActivity->reward_amount = ((float) ($data->rewardAmount)) / pow(10, 18);
        $rewardActivity->number_of_slots = $data->slotCount;
        $rewardActivity->assigned_slots = 0;
        $rewardActivity->is_active = true;
        $saved = $rewardActivity->save();

        // RewardActivityRole records to be saved
        $rewardActivityRoles = [];

        foreach ($data->whitelistContractAddresses as $address) {

            // find all Role Contract from databse based on whitelistContractAddresses
            $roleContract = RoleContract::where('contract_address', $address)->select('id')->firstOrFail();

            // Formulate RewardActivityRole record that will be saved
            $rewardActivityRoles[] = [
                'reward_activity_id' => $rewardActivity->id,
                'role_contract_id' => $roleContract->id
            ];
        }

        // Insert book records
        RewardActivityRole::insert($rewardActivityRoles);

        dispatch((new NotifyNewRewardActivityAvailable($rewardActivity)));

        return $saved;
    }

    /**
     * Update number_of_slots when `ActivityUpdated` event triggered
     *
     * @param Object $payload: payload  send by Smart-Contract event
     * @return Boolean the success or failure message
     */
    public static function activityUpdated($payload)
    {
        // get data object
        $data = $payload->data;

        // Update RewardActivity
        $rewardActivity = RewardActivity::where('sc_activity_id', $data->activityId)->firstOrFail();

        if ($data->slotCount > 0) {
            $rewardActivity->number_of_slots = $data->slotCount;
        } else {
            $rewardActivity->is_active = $data->newState;
        }

        return $rewardActivity->save();
    }
}
