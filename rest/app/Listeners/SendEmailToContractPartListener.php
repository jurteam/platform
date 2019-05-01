<?php

namespace App\Listeners;

use App\Events\NotifyContractParts;
use App\Mail\ContractStatusChanged;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmailToContractPartListener
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\NotifyContractParts event
     * @return void
     */
    public function handle(NotifyContractParts $event)
    {
        Mail::to($event->recipients)
            ->send(new ContractStatusChanged(
                $event->activity,
                ['form' => config('jur.from')]
            ));
    }
}
