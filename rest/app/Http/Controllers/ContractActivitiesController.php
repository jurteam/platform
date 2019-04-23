<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Activity;
use App\Models\Contract;
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
    public function index(Request $request, $id)
    {
        $activities = Activity::exceptDraft()
                            ->byContract($id)
                            ->oldest('created_at')
                            ->get();

        return $this->response->collection($activities, new ContractActivityTransformer);
    }

    /**
     * Save an activity.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \League\Fractal\Resource\Item
     */
    public function store(Request $request, $id)
    {
        $contract = Contract::findOrFail($id);
        $activity = $contract->storeActivity($request);
        $activity->uploadMedia($request);

        return $this->item($activity, new ContractActivityTransformer);
    }

    public function update(Request $request, $id)
    {
        $activity = Activity::findOrFail($id);
        $activity->update($requst->all());

        return $this->item($activity, new ContractActivityTransformer);
    }

    public function updateAsReaded(Request $request)
    {
        $this->validate($request, [
            'ids' => 'required|array|min:1'
        ]);

        Activity::whereIn('id', $request->ids)
             ->update([
                'readed' => true
             ]);

        return response()->json(['status' => 'updated']);
    }
}
