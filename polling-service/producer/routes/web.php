<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {
    $api->group(['prefix' => 'polling-service'], function ($api) {
        $api->group(['prefix' => 'blockchain-events'], function ($api) {
            $api->get('/{serviceName}', 'App\Http\Controllers\BlockchainEventController@index');
        });
    });
});
