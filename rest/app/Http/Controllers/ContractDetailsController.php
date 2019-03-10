<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use App\Models\ContractStatusDetail;
use App\Transformers\AttachmentTransformer;
use App\Transformers\ContractDetailTransformer;

class ContractDetailsController extends Controller
{
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

        return $this->response->collection($details, new ContractDetailTransformer);
    }

    /**
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \League\Fractal\Resource\Item
     */
    public function store(Request $request, $id)
    {
        $detail = new ContractStatusDetail($request->all());

        $detail->contract()
                ->associate(Contract::findOrFail($id))
                ->save();

        return $this->response->item($detail, new ContractDetailTransformer);
    }

    /**
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return @return \League\Fractal\Resource\Collection
     */
    public function uploadMedia(Request $request, $id)
    {
        $detail = ContractStatusDetail::findOrFail($id);
        $detail
            ->addMultipleMediaFromRequest($request->evidences)
            ->each(function($fileAdder) {
                $fileAdder->toMediaCollection('evidences');
            });

        return $this->response->collection($detail->getMedia(), new AttachmentTransformer);
    }
}
