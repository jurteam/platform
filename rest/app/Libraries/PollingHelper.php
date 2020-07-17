<?php

namespace App\Libraries;

use \App\Models\Advocate;
use \App\Models\OathKeeper;
use \App\Models\Reward;
use \App\Models\RewardActivity;
use \App\Models\RoleContract;
use \App\Models\Slot;

class PollingHelper
{
    public static function processTransaction($transaction)
    {
        // intial status for success
        $success = -1;

        switch ($transaction->asset_name) {

            case 'oathKeeper':
                $success = PollingHelper::processOathKeeperEvent($transaction);
                break;

            case 'jurAdvocate':
                $success = PollingHelper::processAdvocateEvent($transaction);
                break;

            case 'jurRewards':
                $success = PollingHelper::processRewardEvent($transaction);
                break;

        }

        return $success;
    }

    public static function processOathKeeperEvent($transaction)
    {
        // intial status for success
        $success = -1;

        switch ($transaction->event_name) {
            case 'OathTaken':
                $success = OathKeeper::oathTaken($transaction);
                break;

            case 'IHoldYourOathFulfilled':
                $success = OathKeeper::iHoldYourOathFulfilled($transaction);
                break;
        }

        return $success;
    }

    public static function processAdvocateEvent($transaction)
    {
        // intial status for success
        $success = -1;

        switch ($transaction->event_name) {
            case 'AdvocateAdded':
                $success = Advocate::advocateAdded($transaction);
                break;

            case 'AdvocateStateUpdated':
                $success = Advocate::advocateStateUpdated($transaction);
                break;

            case 'AdvocateTypeUpdated':
                $success = Advocate::advocateTypeUpdated($transaction);
                break;
        }

        return $success;
    }

    public static function processRewardEvent($transaction)
    {
        // intial status for success
        $success = -1;

        switch ($transaction->event_name) {
            case 'RoleContractUpdated':
                $success = RoleContract::roleContractUpdated($transaction);
                break;

            case 'ActivityCreated':
                $success = RewardActivity::activityCreated($transaction);
                break;

            case 'ActivityUpdated':
                $success = RewardActivity::activityUpdated($transaction);
                break;

            case 'SlotAssigned':
                $success = Slot::slotAssigned($transaction);
                break;

            case 'SlotUpdated':
                $success = Slot::slotUpdated($transaction);
                break;

            case 'SlotRewarded':
                $success = Reward::slotRewarded($transaction);
                break;
        }

        return $success;
    }

}
