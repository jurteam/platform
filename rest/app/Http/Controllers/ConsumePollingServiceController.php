<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Advocate;
use \App\Models\OathKeeper;

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
        $payload = array_to_object($request->all());

        // process payload
        $success = OathKeeper::consumePollingService($payload);

        // return process status
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
        $payload = array_to_object($request->all());

        // intial status for success
        $success = false;

        switch ($payload->event_name) {
            case 'AdvocateAdded':
                $success = Advocate::advocateAdded($payload);
                break;

            case 'AdvocateStateUpdated':
                $success = Advocate::advocateStateUpdated($payload);
                break;

            case 'AdvocateTypeUpdated':
                $success = Advocate::advocateTypeUpdated($payload);
                break;
        }

        // return consume status
        return ['status' => $success];
    }
}
