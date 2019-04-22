<?php

namespace App\Models\Traits;

use App\Models\Activity;

trait ActivitiesTrait
{
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function storeActivity($params)
    {
        $user = User::byWallet($params->header('wallet'))->firstOrFail();

        $this->recordActivities(array_merge($params->all(), [
            'status' => $status->label,
            'status_code' => $status->code,
            'to_wallet' => $this->getSendTo($params->header('wallet')),
            'wallet' => $params->header('wallet')
        ]), $user);
    }

    public function recordActivities($params, $user)
    {
        $attributes = array_merge($params, [
            'user_id' => $user->id
        ]);
        $activity = new Activity($attributes);
        $this->activities()->save($activity);

        return $activity;
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
