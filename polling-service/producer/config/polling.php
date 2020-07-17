<?php

return [
    /*
    |---------------------------------------------------------------------------
    | Maximum Retry
    |---------------------------------------------------------------------------
    |
    | This value is the number of retry between Producer -> Consumer.  This value
    | is used when the transaction fails while publishing.
    |
     */

    'MaxRetry' => 10,

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
