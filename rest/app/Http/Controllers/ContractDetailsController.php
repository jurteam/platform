<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Models\ContractStatusDetail;
use App\Transformers\AttachmentTransformer;
use App\Transformers\ContractStatusDetailTransformer;

class ContractDetailsController extends Controller
{
    use Helpers;

    /**
     * Get the details.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \League\Fractal\Resource\Collection
     */
    public function index(request $request, $id)
    {
        $contract = Contract::findOrFail($id);
        $details = $contract->details;

        return $this->response->collection($details, new ContractStatusDetailTransformer);
    }

    /**
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \League\Fractal\Resource\Item
     */
    public function store(Request $request, $id)
    {
        $detail = ContractStatusDetail::storeDetail(
            $request, Contract::findOrFail($id)
        );
        $detail->uploadMedia($request, 'evidences');

        return $this->response->item($detail, new ContractStatusDetailTransformer);
    }
}
