<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Filters\DisputeFilters;
use Illuminate\Support\Facades\Gate;
use App\Transformers\DisputeTransformer;
use App\Transformers\DisputeDetailTransformer;

class DisputesController extends Controller
{
    use Helpers;

    public function index(DisputeFilters $filters)
    {
        $disputes = Contract::filters($filters)
                            ->latest('updated_at')
                            ->paginate(10);

        return $this->response->paginator($disputes, new DisputeTransformer);
    }

    public function show($id)
    {
        $contract = Contract::findOrFail($id);
        if (Gate::denies('view-dispute', $contract)) {
            abort(404);
        }

        return $this->response->item($contract, new DisputeDetailTransformer);
    }
}
