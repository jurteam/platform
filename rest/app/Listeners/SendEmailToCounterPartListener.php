<?php

namespace App\Listeners;

use App\Events\ExampleEvent;
use App\Events\NotifyCounterPart;
use App\Mail\ContractStatusChanged;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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
        $to = $event->attributes['to']['email'];

        Mail::to($to)
            ->send(new ContractStatusChanged(
                $event->contract
                $event->attributes['from']
            ));
    }
}
