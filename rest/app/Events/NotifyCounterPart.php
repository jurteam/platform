<?php

namespace App\Events;

use App\Models\Contract;

class NotifyCounterPart extends Event
{
	public $contract;

	public $attributes;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Contract $contract, array $attributes)
    {
        $this->contract = $contract;
        $this->attributes = $attributes;
    }
}
