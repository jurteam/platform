<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Activity;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Traits\MediableTrait;
use App\Transformers\ContractActivityTransformer;

class ContractActivitiesController extends Controller
{
    use Helpers, MediableTrait;

    /**
     * Get the contract activities.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return Response
     */
    public function index(Request $request, $id)
    {
        $contract = Contract::findOrFail($id);
        $activities = $contract->activities()->latest()->paginate(10);

        return $this->response->paginator($activities, new ContractActivityTransformer);
    }

    /**
     * Save an activity.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \League\Fractal\Resource\Item
     */
    public function store(Request $request, $id)
    {
        $wallet = $request->header('wallet');

        $contract = Contract::findOrFail($id);
        $user = User::byWallet($wallet)->firstOrFail();

        $activity = $contract->recordActivities($request->all(), $user);
        $activity->uploadMedia($request);

        return $this->item($activity, new ContractActivityTransformer);
    }
}
