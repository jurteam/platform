<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\OathKeeper;

class ConsumerPollingServiceController extends Controller
{
    /**
     * consume polling service for OathKeeper
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function oathKeeper(Request $request)
    {
        // get body of array and convert it to object
        $payload = array_to_object($request->all());

        // process payload
        $success = OathKeeper::consumePollingService($payload);

        // return process status
        return ['status' => $success];
    }
}
