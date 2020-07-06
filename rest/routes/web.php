<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

    $api->group(['prefix' => 'polling'], function ($api) {
        $api->post('oath-keeper', 'App\Http\Controllers\ConsumerPollingServiceController@oathKeeper');
    });

    $api->group(['middleware' => 'wallet.auth'], function ($api) {
        $api->group(['prefix' => 'user'], function ($api) {
            $api->get('/checking', 'App\Http\Controllers\UserController@checkForRegistered');

            $api->get('/', 'App\Http\Controllers\UserController@show');
            $api->post('/', 'App\Http\Controllers\UserController@store');
            $api->put('/', 'App\Http\Controllers\UserController@update');
            $api->delete('/', 'App\Http\Controllers\UserController@destroy');

            $api->get('activities', 'App\Http\Controllers\ContractActivitiesController@getAllByWallet');
        });

        $api->group(['prefix' => 'contracts'], function ($api) {
            $api->delete('delete-all', 'App\Http\Controllers\ContractsController@destroyAll');

            $api->get('/', 'App\Http\Controllers\ContractsController@index');
            $api->get('{id}', 'App\Http\Controllers\ContractsController@show');
            $api->post('/', 'App\Http\Controllers\ContractsController@store');
            $api->put('{id}', 'App\Http\Controllers\ContractsController@update');
            $api->delete('{id}', 'App\Http\Controllers\ContractsController@destroy');

            $api->group(['prefix' => 'status'], function ($api) {
                $api->get('{id}', 'App\Http\Controllers\ContractsController@getLastStatus');
                $api->put('update/{id}', 'App\Http\Controllers\ContractsController@updateStatus');
            });

            $api->group(['prefix' => 'medias'], function ($api) {
                $api->delete('{id}', 'App\Http\Controllers\ContractsController@deleteMedia');
            });

            $api->group(['prefix' => 'disputes'], function ($api) {
                $api->get('all', 'App\Http\Controllers\DisputesController@index');
                $api->get('{id}', 'App\Http\Controllers\DisputesController@show');
                $api->post('{id}', 'App\Http\Controllers\ContractDetailsController@store');
                $api->put('details/{id}', 'App\Http\Controllers\ContractDetailsController@update');

                $api->group(['prefix' => 'evidences'], function ($api) {
                    $api->delete('{id}', 'App\Http\Controllers\ContractDetailsController@deleteMedia');
                });
            });

            $api->group(['prefix' => 'friendly'], function ($api) {
                $api->post('{id}', 'App\Http\Controllers\ContractDetailsController@store');
            });

            $api->group(['prefix' => 'details'], function ($api) {
                $api->get('{id}', 'App\Http\Controllers\ContractDetailsController@index');
            });

            $api->group(['prefix' => 'withdrawal'], function ($api) {
                $api->post('{id}', 'App\Http\Controllers\WithdrawalsController@store');
            });
        });

        $api->group(['prefix' => 'votes'], function ($api) {
            $api->get('{id}', 'App\Http\Controllers\ContractVotesController@index');
            $api->get('filter/{disputeId}/{winnerId}', 'App\Http\Controllers\ContractVotesController@filterById');
            $api->get('live/{id}', 'App\Http\Controllers\ContractVotesController@liveVotes');
            $api->post('/', 'App\Http\Controllers\ContractVotesController@store');
            $api->delete('{id}', 'App\Http\Controllers\ContractVotesController@destroy');
            $api->group(['prefix' => 'medias'], function ($api) {
                $api->delete('{id}', 'App\Http\Controllers\ContractVotesController@deleteMedia');
            });
        });

        $api->group(['prefix' => 'activities'], function ($api) {
            $api->get('{id}', 'App\Http\Controllers\ContractActivitiesController@index');
            $api->post('{id}', 'App\Http\Controllers\ContractActivitiesController@store');
            $api->put('readed', 'App\Http\Controllers\ContractActivitiesController@updateAsReaded');
            $api->group(['prefix' => 'medias'], function ($api) {
                $api->delete('{id}', 'App\Http\Controllers\ContractActivitiesController@deleteMedia');
            });
        });

        $api->group(['prefix' => 'transactions'], function ($api) {
            $api->get('/', 'App\Http\Controllers\TransactionsController@getResolvableByWallet');
            $api->post('/', 'App\Http\Controllers\TransactionsController@store');
            $api->put('{id}', 'App\Http\Controllers\TransactionsController@update');
            $api->put('{id}/lock', 'App\Http\Controllers\TransactionsController@lock');
            $api->put('{id}/unlock', 'App\Http\Controllers\TransactionsController@unlock');
            $api->delete('{id}', 'App\Http\Controllers\TransactionsController@delete');
        });
    });

    $api->group(['prefix' => 'oath-keeper'], function ($api) {
        $api->group(['prefix' => 'analytics'], function ($api) {
            $api->get('/', 'App\Http\Controllers\OathKeeperController@getCards');
            $api->get('/{cardname}', 'App\Http\Controllers\OathKeeperController@getCard');
        });

        $api->group(['prefix' => 'oath-takers'], function ($api) {
            $api->get('/', 'App\Http\Controllers\OathKeeperController@getOathTakers');
            $api->get('/{address}', 'App\Http\Controllers\OathKeeperController@getOathTaker');
        });
    });

    $api->group(['prefix' => 'status'], function ($api) {
        $api->group(['prefix' => 'holders'], function ($api) {
            $api->get('/', 'App\Http\Controllers\StatusController@getHolders');
            $api->get('/{wallet}', 'App\Http\Controllers\StatusController@getHolder');
        });
    });

    $api->group(['prefix' => 'advocates'], function ($api) {
        $api->get('/', 'App\Http\Controllers\AdvocateController@index');
        $api->get('/{wallet}', 'App\Http\Controllers\AdvocateController@show');
    });

    $api->get('faqs', 'App\Http\Controllers\FaqsController@index');
});
