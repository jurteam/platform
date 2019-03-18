<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\ContractVote;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Transformers\ContractVoteTransformer;
use App\Http\Controllers\Traits\MediableTrait;

class ContractVotesController extends Controller
{
    use Helpers, MediableTrait;

    /**
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \League\Fractal\Resource\Paginator
     */
    public function index(Request $request, $id)
    {
        $contract = Contract::findOrFail($id);
        $votes = $contract->votes()->latest()->paginate(10);

        return $this->response->paginator($votes, new ContractVoteTransformer);
    }

    /**
     * Store a vote.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \League\Fractal\Resource\Item
     */
    public function store(Request $request)
    {
        $vote = ContractVote::create($request->all());
        $vote->uploadMedia($request);

        return $this->response->item($vote, new ContractVoteTransformer);
    }

    /**
     * Delete a vote.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        ContractVote::destroy($id);

        return response()->json(compact('id'));
    }
}
