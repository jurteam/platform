<?php

namespace App\Events;

use App\Models\Activity;

class NotifyContractParts extends Event
{
    public $activity;

    public $recipients;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Activity $activity, array $recipients)
    {
        $this->activity = $activity;
        $this->recipients = $recipients;
    }
}
