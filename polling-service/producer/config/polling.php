<?php

return [
    /*
    |---------------------------------------------------------------------------
    | Real Time Instance Id
    |---------------------------------------------------------------------------
    |
    | This value is the id of the real-time polling service.  This value is used
    | when the app needs to get information related to real-time polling service.
    |
     */

    'RealTimeInstanceId' => 0,

    /*
    |---------------------------------------------------------------------------
    | Past Event Reading Host
    |---------------------------------------------------------------------------
    |
    | This value is the id of the real-time polling service.  This value is used
    | when the app needs to get information related to real-time polling service.
    |
     */
    // Test  https://beeceptor.com/console/as123589
    'PERHost' => env('PER_HOST', 'https://as123589.free.beeceptor.com')
];
