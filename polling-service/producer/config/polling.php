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

    'PERHost' => env('PER_HOST', 'http://polling_per:3000')
];
