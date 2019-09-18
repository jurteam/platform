<?php

namespace App\Models\Traits;

trait StatusesTrait
{
    use StatusesNotifable;

    /**
     * Get wallet from last user that had
     * change the contract status.
     *
     * @return string
     */
    public function getLastStatusFrom()
    {
        $activity = $this->activities
            ->filter(function($activity) {
                if (! empty($activity->chain_updated_at)) {
                    return !$activity->chain_updated_at->isFuture();
                }
                return true;
            })
            ->last();
        if ($activity) {
            return strtolower($activity->wallet);
        }
        return null;
    }

    /**
     *
     * @return null|string
     */
    public function getLastStatusPart()
    {
        $wallet = $this->getLastStatusFrom();

        if ($wallet == strtolower($this->part_a_wallet)) {
            return config('jur.part_a_label');
        } elseif ($wallet == strtolower($this->part_b_wallet)) {
            return config('jur.part_b_label');
        }
        return null;
    }

    public function getChainUpdatedAtFromRequest($params)
    {
        if ($params->has('chain_updated_at')) {
            return $params->get('chain_updated_at');
        }
        return null;
    }

    public function hasStatusCode($code)
    {
        if (is_array($code)) {
            return in_array($this->status->code, $code);
        }
        return $this->status->code == $code;
    }

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
        $history = $this->histories->filter(function($history) {
            if (! empty($history->chain_updated_at)) {
                return !$history->chain_updated_at->isFuture();
            }
            return true;
        })->last();

        if (! empty($history)) {
            return $history->status->code !== config('jur.statuses')[1]['code'];
        }
    }

    public function getCurrentStatusUpdatedAt()
    {
        $contractStatusHistory = $this->histories->filter(function($history) {
            if ($history->chain_updated_at) {
                return !$history->chain_updated_at->isFuture();
            }
            return !$history->created_at->isFuture();
        })->last();

        if ($contractStatusHistory) {
            return $contractStatusHistory->getUpdatedDate();
        }
        return $this->updated_at->valueOf();
    }

    public function isStatusChanged($params)
    {
        $wallet = $this->getLastStatusFrom();

        return strtolower($params->header('wallet')) !== $wallet;
    }
}
