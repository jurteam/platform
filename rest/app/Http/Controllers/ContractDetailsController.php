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
    public function index($id)
    {
        $idc = decodeId($id);
        $contract = Contract::findOrFail($idc);
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
        $idc = decodeId($id);
        $this->validate($request, [
            'code' => 'required|exists:contract_statuses,code'
        ]);

        $detail = ContractStatusDetail::storeDetail(
            $request, Contract::findOrFail($idc)
        );
        $detail->uploadMedia($request);

        return $this->response->item($detail, new ContractStatusDetailTransformer);
    }

    public function update(Request $request, $id)
    {
        $detail = ContractStatusDetail::findOrFail($id);
        $detail->updateDetail(
            $request, Contract::findOrFail($request->contract_id)
        );
        $detail->uploadMedia($request);

        return $this->response->item($detail, new ContractStatusDetailTransformer);
    }
}
