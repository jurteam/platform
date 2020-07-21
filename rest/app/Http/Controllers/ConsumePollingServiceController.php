<?php

namespace App\Http\Controllers;

use App\Libraries\PollingHelper;
use Illuminate\Http\Request;

class ConsumePollingServiceController extends Controller
{
    /**
     * consume polling service for OathKeeper
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function oathKeeper(Request $request)
    {
        // get body of array and convert it to object
        $transaction = array_to_object($request->all());

        // process transaction
        $success = PollingHelper::processOathKeeperEvent($transaction);

        // return consume status
        return ['status' => $success];
    }

    /**
     * consume polling service for Advocate
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function advocate(Request $request)
    {
        // get body of array and convert it to object
        $transaction = array_to_object($request->all());

        // process transaction
        $success = PollingHelper::processAdvocateEvent($transaction);

        // return consume status
        return ['status' => $success];
    }

    /**
     * consume polling service for Reward
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function reward(Request $request)
    {
        // get body of array and convert it to object
        $transaction = array_to_object($request->all());

        // process transaction
        $success = PollingHelper::processRewardEvent($transaction);

        // return consume status
        return ['status' => $success];
    }

    /**
     * consume polling service for OathKeeper
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function status(Request $request)
    {
        // get body of array and convert it to object
        $transaction = array_to_object($request->all());

        // process transaction
        $success = PollingHelper::processStatusEvent($transaction);

        // return consume status
        return ['status' => $success];
    }
}
