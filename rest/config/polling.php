<?php

return [

    /*
    |---------------------------------------------------------------------------
    | Polling Producer Host
    |---------------------------------------------------------------------------
    |
    | This value is the id of the real-time polling service.  This value is used
    | when the app needs to get information related to real-time polling service.
    |
     */

    'ProducerHost' => env('PRODUCER_HOST', 'http://polling_producer')
];
