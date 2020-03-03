<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Filters\DisputeFilters;
use Illuminate\Support\Facades\Gate;
use App\Transformers\DisputeTransformer;
use App\Transformers\DisputeDetailTransformer;
use App\Http\Controllers\Traits\CustomPaginationTrait;

class DisputesController extends Controller
{
    use Helpers, CustomPaginationTrait;

    /**
     * @param  \App\Filters\DisputeFilters  $filters
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(DisputeFilters $filters, Request $request)
    {
        $disputes = Contract::filters($filters)
                            ->latest('contracts.updated_at')
                            ->get();

        return $this->response->paginator(
            $this->customPagination($disputes, $request),
            new DisputeTransformer
        );
    }

    public function show($id)
    {
        $idc = decodeId($id);   
        $contract = Contract::findOrFail($idc);
        if (Gate::denies('view-dispute', $contract)) {
            abort(404);
        }

        return $this->response->item($contract, new DisputeDetailTransformer);
    }
}
