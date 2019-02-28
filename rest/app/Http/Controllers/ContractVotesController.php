<?php

namespace App\Http\Controllers;

use App\Models\ContractVote;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Transformers\ContractVoteTransformer;

class ContractVotesController extends Controller
{
    use Helpers;

    /**
     * @param  \Illuminate\Http\Request $request
     * @return \League\Fractal\
     */
    public function index(Request $request)
    {
        $votes = ContractVote::filters($request)->paginate(10);

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
