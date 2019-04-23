<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function($api) {
    $api->group(['middleware' => 'wallet.auth'], function($api) {
        $api->group(['prefix' => 'user'], function($api) {
            $api->get('/checking', 'App\Http\Controllers\UserController@checkForRegistered');

            $api->get('/', 'App\Http\Controllers\UserController@show');
            $api->post('/', 'App\Http\Controllers\UserController@store');
            $api->put('/', 'App\Http\Controllers\UserController@update');
            $api->delete('/', 'App\Http\Controllers\UserController@destroy');

            $api->get('activities', 'App\Http\Controllers\ContractActivitiesController@getAllByWallet');
        });

        $api->group(['prefix' => 'contracts'], function($api) {
            $api->delete('delete-all', 'App\Http\Controllers\ContractsController@destroyAll');

            $api->get('/', 'App\Http\Controllers\ContractsController@index');
            $api->get('{id}', 'App\Http\Controllers\ContractsController@show');
            $api->post('/', 'App\Http\Controllers\ContractsController@store');
            $api->put('{id}', 'App\Http\Controllers\ContractsController@update');
            $api->delete('{id}', 'App\Http\Controllers\ContractsController@destroy');

            $api->group(['prefix' => 'status'], function($api) {
                $api->put('update/{id}', 'App\Http\Controllers\ContractsController@updateStatus');
            });

            $api->group(['prefix' => 'medias'], function($api) {
                $api->delete('{id}', 'App\Http\Controllers\ContractsController@deleteMedia');
            });

            $api->group(['prefix' => 'disputes'], function($api) {
                // $api->get('all', 'App\Http\Controllers\DisputesController@index');
                // $api->get('{id}', 'App\Http\Controllers\DisputesController@show');
                $api->post('{id}', 'App\Http\Controllers\ContractDetailsController@store');
                $api->group(['prefix' => 'evidences'], function($api) {
                    $api->delete('{id}', 'App\Http\Controllers\ContractDetailsController@deleteMedia');
                });
            });

            $api->group(['prefix' => 'friendly'], function($api) {
                $api->post('{id}', 'App\Http\Controllers\ContractDetailsController@store');
            });

            $api->group(['prefix' => 'details'], function($api) {
                $api->get('{id}', 'App\Http\Controllers\ContractDetailsController@index');
            });
        });

        $api->group(['prefix' => 'votes'], function($api) {
            $api->get('{id}', 'App\Http\Controllers\ContractVotesController@index');
            $api->post('/', 'App\Http\Controllers\ContractVotesController@store');
            $api->delete('{id}', 'App\Http\Controllers\ContractVotesController@destroy');
            $api->group(['prefix' => 'medias'], function($api) {
                $api->delete('{id}', 'App\Http\Controllers\ContractVotesController@deleteMedia');
            });
        });

        $api->group(['prefix' => 'activities'], function($api) {
            $api->get('{id}', 'App\Http\Controllers\ContractActivitiesController@index');
            $api->post('/', 'App\Http\Controllers\ContractActivitiesController@store');
            $api->put('readed', 'App\Http\Controllers\ContractActivitiesController@updateAsReaded');
            $api->group(['prefix' => 'medias'], function($api) {
                $api->delete('{id}', 'App\Http\Controllers\ContractActivitiesController@deleteMedia');
            });
        });
    });

    $api->get('faqs', 'App\Http\Controllers\FaqsController@index');
});
