<?php

namespace App\Models\Traits;

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
}
