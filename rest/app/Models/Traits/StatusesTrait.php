<?php

namespace App\Models\Trait;

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
