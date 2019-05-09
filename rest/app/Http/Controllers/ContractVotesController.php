<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\ContractVote;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Filters\ContractVoteFilters;
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
    public function index(ContractVoteFilters $filters, $id)
    {
        $votes = ContractVote::byContract($id)
                        ->filters($filters)
                        ->latest()->paginate(15);

        return $this->response->paginator($votes, new ContractVoteTransformer);
    }

    /**
     * @param  \App\Filters\ContractVoteFilters $filters
     * @param  int $id
     * @return \League\Fractal\Resource\Collection
     */
    public function liveVotes(ContractVoteFilters $filters, $id)
    {
        $contract = Contract::findOrFail($id);
        $votes = ContractVote::byContract($id)
                        ->filters($filters)
                        ->get();

        $response = $this->response->collection($votes, new ContractVoteTransformer)->getContent();

        return response()->json(array_merge(
            $contract->getPartialsData(), [
                'data' => json_decode($response)
            ])
        );
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
