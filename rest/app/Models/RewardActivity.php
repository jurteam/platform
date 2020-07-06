<?php

namespace App\Models;

use App\Models\RewardActivityRole;
use App\Models\UserContract;
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
        $exists = RewardActivity::where('sc_activity_id', $data->id)->first();

        // ignore creation if already exists
        if (isset($exists)) {
            Log::warning('The RewardActivity with id `' . $data->id . '` already exists in the database.');
            return false;
        }

        // Save RewardActivity
        $rewardActivity = new RewardActivity;
        $rewardActivity->sc_activity_id = $data->id;
        $rewardActivity->name = $data->name;
        $rewardActivity->reward_amount = $data->rewardAmount;
        $rewardActivity->number_of_slots = $data->slotCount;
        $rewardActivity->is_active = true;
        $saved = $rewardActivity->save();

        // find all UserContracts from databse based on whitelistContractAddresses
        $userContracts = UserContract::whereIn('contract_address', $data->whitelistContractAddresses)->select('id', 'contract_address')->get()->toArray();

        // RewardActivityRole records to be saved
        $rewardActivityRoles = [];

        foreach ($data->whitelistContractIds as $address) {

            // find userContract
            $userContract = array_filter($userContracts, function ($item) use ($address) {
                return $item->contract_address == $address;
            });

            // Formulate RewardActivityRole record that will be saved
            $rewardActivityRoles[] = [
                'reward_activity_id' => $userContract->id,
                'user_contract_id' => $rewardActivity->id
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
        $rewardActivity = RewardActivity::where('sc_activity_id', $data->id)->firstOrFail();
        $rewardActivity->number_of_slots = $data->slotCount;
        return $rewardActivity->save();
    }
}