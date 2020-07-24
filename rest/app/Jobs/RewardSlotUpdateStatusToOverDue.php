<?php

namespace App\Jobs;

use \App\Models\Slot;

class RewardSlotUpdateStatusToOverDue extends Job
{

    private $slot;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Slot $slot)
    {
        $this->slot = $slot;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $sameSlot = Slot::where('id', $this->slot->id)->where('assigned_wallet', $this->slot->assigned_wallet)->first();

        if (!isset($sameSlot)) {
            return;
        }

        // Change current-status of the slot
        $this->slot->status = 'OverDue';

        // Save changes
        $saved = $this->slot->save();

        if ($saved) {
            // send a notification mail if user has updated mail id
            //TODO: send mail
        }
    }
}
