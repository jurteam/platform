<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Contract;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Filters\ContractFilters;
use App\Transformers\ContractTransformer;

class ContractsController extends Controller
{
    use Helpers;

    /**
     * Retrieve all contracts for a single user.
     *
     * @param  \App\Filters\ContractFilters $filters
     * @return \Illuminate\Http\Response
     */
    public function index(ContractFilters $filters)
    {
        $user = User::byWallet($wallet)->firstOrFail();
        $contracts = $user->contracts()->filters($filters)->paginate(10);

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
            'part_b_wallet' => 'required'
        ]);

        $owner = User::byWallet($wallet)->firstOrFail();
        $contract = new Contract($request->all());

        $owner->contracts()->save($contract);

        return response()->json(compact('contract'), 201);
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

        return $this->item($contract, new ContractTransformer);
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

        return $this->item($contract, new ContractTransformer);
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

    /**
     * Update contract status.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \League\Fractal\Resource\Item
     */
    public function updateStatus(Request $request, $id)
    {
        $user = User::byWallet($wallet)->firstOrFail();
        $contract = Contract::findOrFail($id);

        $contract->updateStatus($request, $user);

        return $this->item($contract, new ContractTransformer);
    }
}
