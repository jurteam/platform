<?php

namespace App\Models\Traits;

use App\Models\User;
use App\Models\Activity;
use App\Models\ContractStatus;

trait ActivitiesTrait
{
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function storeActivity($params)
    {
        $status = ContractStatus::byCode($params->code)->firstOrFail();
        $user = User::byWallet($params->header('wallet'))->firstOrFail();

        return $this->recordActivities(array_merge($params->all(), [
            'status' => $status->label,
            'status_code' => $status->code,
            'to_wallet' => $this->getSendTo($params->header('wallet')),
            'wallet' => $params->header('wallet')
        ]), $user);
    }

    public function recordActivities($params, $user)
    {
        $attributes = array_merge($params, [
            'user_id' => $user->id,
            'contract_id' => $this->id
        ]);
        return Activity::create($attributes);
    }

    public function getSendTo($wallet)
    {
        $contractWallet = strtolower($this->part_a_wallet);
        $requestWallet = strtolower($wallet);

        if ($contractWallet == $requestWallet) {
            return $this->part_b_wallet;
        }
        return $this->part_a_wallet;
    }
}
