<?php

namespace App\Models;

use App\Models\RewardActivityRole;
use Illuminate\Database\Eloquent\Model;
use Log;

class RewardActivity extends Model
{
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
        $rewardActivity->is_active = true;
        $saved = $rewardActivity->save();

        // find all Role Contract from databse based on whitelistContractAddresses
        $roleContracts = RoleContract::whereIn('contract_address', (Array) $data->whitelistContractAddresses)->select('id', 'contract_address')->get()->toArray();

        // RewardActivityRole records to be saved
        $rewardActivityRoles = [];

        foreach ($data->whitelistContractAddresses as $address) {

            // find Role Contract
            $roleContract = array_filter($roleContracts, function ($item) use ($address) {
                return $item['contract_address'] == $address;
            });

            // Formulate RewardActivityRole record that will be saved
            $rewardActivityRoles[] = [
                'reward_activity_id' => $rewardActivity->id,
                'role_contract_id' => isset($roleContract[0]) ? $roleContract[0]['id'] : null
            ];
        }

        // Insert book records
        RewardActivityRole::insert($rewardActivityRoles);

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
