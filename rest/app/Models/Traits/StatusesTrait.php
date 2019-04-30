<?php

namespace App\Models\Traits;

use App\Models\User;
use App\Models\Activity;
use App\Events\NotifyCounterPart;

trait StatusesTrait
{
    public function flagAsOpenDispute()
    {
        $this->update(['is_a_dispute' => true]);
        return $this;
    }

    public function flagAsFriendlyResolution()
    {
        $this->update(['is_a_friendly_resolution' => true]);
        return $this;
    }

    public function isNotDraft()
    {
        return $this->status->code > config('jur.statuses')[1]['code'];
    }

    public function getCurrentStatusUpdatedAt()
    {
        $code = $this->status->code;

        $statusActivity = $this->activities()
            ->where('status_code', $code)
            ->where('contract_id', $this->id)
            ->first();

        if ($statusActivity) {
            return $statusActivity->created_at->valueOf();
        }
        return $this->updated_at->valueOf();
    }

    public function notifyCounterPart(Activity $activity)
    {
        $attributes = $this->getNotifyData($activity);
        if (! empty($attributes['to']['address'])) {
            event(new NotifyCounterPart($activity->contract, $attributes));
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
}
