<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Contract;
use App\Models\Activity;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Filters\ActivityFilters;
use App\Http\Controllers\Traits\MediableTrait;
use App\Transformers\ContractActivityTransformer;

class ContractActivitiesController extends Controller
{
    use Helpers, MediableTrait;

    public function getAllByWallet(ActivityFilters $filters, Request $request)
    {
        $activities = Activity::exceptDraft()
                        ->exceptWaiting()
                        ->exceptFuture()
                        ->filters($filters)
                        ->paginate($request->get('perPage', 10));

        return $this->response->paginator($activities, new ContractActivityTransformer);
    }

    /**
     * Get the contract activities.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return Response
     */
    public function index($id)
    {
        $idc = decodeId($id);        
        $activities = Activity::exceptDraft()
                            ->exceptWaiting()
                            ->byContract($idc)
                            ->byUpdatedDate()
                            ->get();

        return $this->response->collection(
            $activities->filter(function($activity) {
                return !is_null($activity->getUpdatedDate());
            }),
            new ContractActivityTransformer
        );
    }

    /**
     * Save an activity.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \League\Fractal\Resource\Item
     */
    public function store(Request $request, $id)
    {
        $idc = decodeId($id);
        $contract = Contract::findOrFail($idc);
        $activity = $contract->storeActivity($request);
        $activity->uploadMedia($request);

        return $this->item($activity, new ContractActivityTransformer);
    }

    public function update(Request $request, $id)
    {
        $activity = Activity::findOrFail($id);
        $activity->update($request->all());

        return $this->item($activity, new ContractActivityTransformer);
    }

    public function updateAsReaded(Request $request)
    {
        $this->validate($request, [
            'ids' => 'required|array|min:1'
        ]);

        Activity::updateStatus($request);

        return response()->json(['status' => 'updated']);
    }
}
