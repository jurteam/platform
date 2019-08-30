<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Contract;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Filters\ContractFilters;
use Illuminate\Support\Facades\Gate;
use App\Transformers\ContractTransformer;
use App\Transformers\AttachmentTransformer;
use App\Http\Controllers\Traits\MediableTrait;
use App\Transformers\ContractDetailTransformer;

class ContractsController extends Controller
{
    use Helpers, MediableTrait;

    /**
     * Retrieve all contracts for a single user.
     *
     * @param  \App\Filters\ContractFilters $filters
     * @return \Illuminate\Http\Response
     */
    public function index(ContractFilters $filters, Request $request)
    {
        $contracts = Contract::filters($filters)
                            ->latest('updated_at')
                            ->paginate($request->get('perPage', 10));

        return $this->response->paginator($contracts, new ContractTransformer);
    }

    /**
     * Create a new contract.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'part_a_wallet' => 'required',
            'part_b_wallet' => 'required',
        ]);

        $wallet = $request->header('wallet');
        $contract = Contract::storeContract(
            $request,
            User::byWallet($wallet)->first()
        );

        return $this->response->item($contract, new ContractDetailTransformer);
    }

    /**
     * Get contract.
     *
     * @param  int $id
     * @return \League\Fractal\Resource\Item
     */
    public function show($id)
    {
        $contract = Contract::findOrFail($id);
        if (Gate::denies('view-contract', $contract)) {
            abort(404);
        }

        return $this->response->item($contract, new ContractDetailTransformer);
    }

    /**
     * Update contract.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \League\Fractal\Resource\Item
     */
    public function update(Request $request, $id)
    {
        $contract = Contract::findOrFail($id);

        $contract->update($request->all());
        $contract->uploadMedia($request);

        return $this->response->item($contract, new ContractDetailTransformer);
    }

    /**
     * Delete a contract.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Contract::destroy($id);

        return response()->json(compact('id'));
    }

    public function getLastStatus(Request $request, $id)
    {
        $contract = Contract::findOrFail($id);

        if ($contract->isStatusChanged($request)) {
            return $this->response->item($contract, new ContractDetailTransformer);
        }

        return response()->json(['status' => 'not_changed']);
    }

    /**
     * Update contract status.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \League\Fractal\Resource\Item
     */
    public function updateStatus(Request $request, $id)
    {
        $this->validate($request, [
            'code' => 'required|exists:contract_statuses,code'
        ]);

        $contract = Contract::findOrFail($id);
        $contract->updateStatusByCode($request);

        return $this->response->item($contract, new ContractDetailTransformer);
    }

    public function destroyAll(ContractFilters $filters)
    {
        Contract::filters($filters)->delete();

        return response()->json(['status' => 'deleted']);
    }
}
