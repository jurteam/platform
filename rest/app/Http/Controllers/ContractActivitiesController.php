<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Transformers\ContractActivityTransformer;

class ContractActivitiesController extends Controller
{
    use Helpers;

    /**
     * Get the contract activities.
     *
     * @param  \Illuminate\Http\Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $activities = Activity::filters($request)->paginate(10);

        return $this->response->paginator($activities, new ContractActivityTransformer);
    }

    /**
     * Save an activity.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \League\Fractal\Resource\Item
     */
    public function store(Request $request)
    {
        $activity = Activity::create($request->all());

        return $this->item($activity, new ContractActivityTransformer);
    }
}
