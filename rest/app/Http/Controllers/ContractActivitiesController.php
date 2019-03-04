<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        $activities = Activity::filters($request)->latest()->paginate(10);

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

        $contract->recordActivities($request->all(), $user);

        return $this->item($activity, new ContractActivityTransformer);
    }

    /**
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadMedia(Request $request, $id)
    {
        $activity = Activity::findOrFail($id);
        $activity
            ->addMultipleMediaFromRequest($request->attachments)
            ->each(function($fileAdder) {
                $fileAdder->toMediaCollection('attachments');
            });

        return respon()->json([
            'attachments' => $activity->getMedia()
        ]);
    }
}
