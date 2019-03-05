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
    public function index(ContractFilters $filters, Request $request)
    {
        $wallet = $request->header('wallet');

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

        $wallet = $request->header('wallet');

        $owner = User::byWallet($wallet)->firstOrFail();
        $contract = new Contract($request->all());

        $owner->contracts()->save($contract);

        return $this->response->item($contract, new ContractTransformer);
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

        return $this->response->item($contract, new ContractTransformer);
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

        return $this->response->item($contract, new ContractTransformer);
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
        $wallet = $request->header('wallet');

        $user = User::byWallet($wallet)->firstOrFail();
        $contract = Contract::findOrFail($id);

        $contract->updateStatus($request, $user);

        return $this->response->item($contract, new ContractTransformer);
    }

    /**
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadMedia(Request $request, $id)
    {
        $contract = Contract::findOrFail($id);
        $contract
            ->addMultipleMediaFromRequest($request->attachments)
            ->each(function($fileAdder) {
                $fileAdder->toMediaCollection('attachments');
            });

        return respon()->json([
            'attachments' => $contract->getMedia()
        ]);
    }

    public function destroyAllByOwner(Request $request)
    {
        $wallet = $request->header('wallet');

        $user = User::byWallet($wallet)->firstOrFail();

        $user->contracts()->delete();

        return response()->json(['status' => 'deleted']);
    }
}
