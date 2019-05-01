<?php

namespace App\Events;

use App\Models\Activity;

class NotifyCounterPart extends Event
{
	public $activity;

	public $attributes;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Activity $activity, array $attributes)
    {
        $this->activity = $activity;
        $this->attributes = $attributes;
    }
}
