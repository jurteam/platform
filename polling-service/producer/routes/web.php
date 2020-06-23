<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {
    $api->group(['prefix' => 'polling-service'], function ($api) {
        $api->group(['prefix' => 'real-time'], function ($api) {
            $api->get('/', 'App\Http\Controllers\RealTimeEventController@index');
            $api->post('/', 'App\Http\Controllers\RealTimeEventController@store');
        });
    });
});
