<?php

namespace App\Listeners;

use App\Events\ExampleEvent;
use App\Events\NotifyCounterPart;
use App\Mail\ContractStatusChanged;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmailToCounterPartListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\NotifyCounterPart  $event
     * @return void
     */
    public function handle(NotifyCounterPart $event)
    {
        Mail::to($event->attributes['to']['address'])
            ->send(new ContractStatusChanged(
                $event->contract,
                $event->attributes['from']
            ));
    }
}
