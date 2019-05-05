<?php

namespace App\Models\Traits;

trait StatusesTrait
{
    use StatusesNotifable;

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
        if (! empty($this->chain_updated_at)) {
            return $this->chain_updated_at->valueOf();
        }

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
}
