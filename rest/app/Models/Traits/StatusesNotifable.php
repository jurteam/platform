<?php

namespace App\Models\Traits;

use App\Jobs\Agreed;
use App\Models\User;
use App\Jobs\Ongoing;
use App\Models\Activity;
use App\Jobs\OpenDispute;
use App\Jobs\ContractClosed;
use App\Jobs\WaitingForPayment;
use App\Events\NotifyCounterPart;
use App\Events\NotifyContractParts;
use App\Jobs\OpenFriendlyResolution;
use App\Jobs\WaitingForCounterParty;

trait StatusesNotifable
{
    public function notifyParts(Activity $activity)
    {
        if ($activity->isFuture()) {
            return false;
        }

        if ($activity->fromSystem()) {
            $recipients = $this->getContractRecipients();

            if (! empty($recipients)) {
                event(new NotifyContractParts($activity, $recipients));
            }
        } else {
            if ($activity->status_code == 1) {
                dispatch(new WaitingForCounterParty($activity));
            } elseif ($activity->status_code == 2) {
                dispatch(new WaitingForPayment($activity));
            } elseif ($activity->status_code == 5) {
                dispatch(new Ongoing($activity));
            } elseif ($activity->status_code == 7) {
                dispatch(new Agreed($activity));
            } elseif ($activity->status_code == 9) {
                dispatch(new ContractClosed($activity));
            } elseif ($activity->status_code == 21) {
                dispatch(new OpenFriendlyResolution($activity));
            } elseif ($activity->status_code == 31) {
                dispatch(new OpenDispute($activity));
            }
        }
    }

    protected function getNotifyData($activity)
    {
        $contract = $activity->contract;
        if ($contract->part_a_wallet == $activity->wallet) {
            return [
                'from' => [
                    'address' => $contract->part_a_email ?: $this->getUserEmail($activity->wallet),
                    'name' => $contract->part_a_name ?: $contract->part_a_wallet
                ],
                'to' => [
                    'address' => $contract->part_b_email ?: $this->getUserEmail($contract->part_b_wallet),
                    'name' => $contract->part_b_name ?: $contract->part_b_wallet
                ]
            ];
        } elseif ($contract->part_b_wallet == $activity->wallet) {
            return [
                'from' => [
                    'address' => $contract->part_b_email ?: $this->getUserEmail($activity->wallet),
                    'name' => $contract->part_b_name ?: $contract->part_b_wallet
                ],
                'to' => [
                    'address' => $contract->part_a_email ?: $this->getUserEmail($contract->part_a_wallet),
                    'name' => $contract->part_a_name ?: $contract->part_a_wallet
                ]
            ];
        }
    }

    protected function getUserEmail($wallet)
    {
        $user = User::byWallet($wallet)->first();

        if ($user) {
            return $user->email;
        }
        return null;
    }

    protected function getAllMembersWithEmail()
    {
        return User::byEmail()->get();
    }

    protected function getContractRecipients()
    {
        $recipients = [];
        if (! empty($this->part_a_email)) {
            $recipients[] = $this->part_a_email;
        } else {
            $recipient = $this->getUserEmail($this->part_a_wallet);
            if (! is_null($recipient)) {
                $recipients[] = $recipient->email;
            }
        }

        if (! empty($this->part_b_email)) {
            $recipients[] = $this->part_b_email;
        } else {
            $recipient = $this->getUserEmail($this->part_b_wallet);
            if (! is_null($recipient)) {
                $recipients[] = $recipient->email;
            }
        }

        return $recipients;
    }
}
