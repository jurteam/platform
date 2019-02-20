<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function($api) {
    $api->group(['prefix' => 'user', 'middleware' => 'wallet.auth'], function($api) {
        $api->get('/', 'App\Http\Controllers\UserController@show');
        $api->post('/', 'App\Http\Controllers\UserController@store');
        $api->put('/', 'App\Http\Controllers\UserController@update');
        $api->delete('/', 'App\Http\Controllers\UserController@destroy');
    });
});
