<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use League\Fractal\Manager;
use App\Models\ContractVote;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Filters\ContractVoteFilters;
use League\Fractal\Resource\Collection;
use Illuminate\Database\Eloquent\Collection as EloquenCollection;
use App\Transformers\ContractVoteTransformer;
use App\Http\Controllers\Traits\MediableTrait;
use League\Fractal\Serializer\ArraySerializer;
use App\Models\Withdrawal;

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
        $idc = decodeId($id);
        $votes = ContractVote::byContract($idc)
                        ->filters($filters)
                        ->latest()
                        ->exceptWaiting()
                        ->paginate(15);

        return $this->response->paginator($votes, new ContractVoteTransformer);
    }

    /**
     * @param  \App\Filters\ContractVoteFilters $filters
     * @param  int $id
     * @return \League\Fractal\Resource\Collection
     */
    public function liveVotes(ContractVoteFilters $filters, $id)
    {
        $idc = decodeId($id);
        $contract = Contract::findOrFail($idc);
        $votes = ContractVote::byContract($idc)
                        ->filters($filters)
                        ->exceptWaiting()
                        ->get();

        $response = $this->createDataFromResponse($votes, new ContractVoteTransformer);

        return response()->json(array_merge(
            $contract->getPartialsData(), [
                'data' => $response->toArray()
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

        // decode contract_id
        $allParam = $request->all();
        $allParam['contract_id'] = decodeId($allParam['contract_id']);

        $vote = ContractVote::create($allParam);
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

    /**
     * @param  \Illuminate\Database\Eloquent\Collection $collection
     * @param  \League\Fractal\TransformerAbstract $transformer
     */
    protected function createDataFromResponse(EloquenCollection $collection, $transformer)
    {
        $manager = new Manager;
        $manager->setSerializer(new ArraySerializer);

        return $manager->createData(
            new Collection($collection, $transformer)
        );
    }

    public function filterById(Request $request, $disputeId, $winnerId)
    {
      $curr_user = $request->header('wallet');
      $dispuetIdDecoded = decodeId($disputeId);

      $search_cond = ["oracle_wallet" => $curr_user, "wallet_part" => $winnerId, "contract_id" => $dispuetIdDecoded];

      $votes = ContractVote::where($search_cond)->get();


      $withdrawalSearchCond = ["contract_id" => $dispuetIdDecoded, "wallet" => $curr_user, "type" => "payout"];
      $withdrawal = Withdrawal::where($withdrawalSearchCond)->get();

      // dd("withdrawal: ", $withdrawal);

      $response = [
        "id" => 0,
        "amount" => 0,
      ];

      if($votes->isEmpty()) {
        $response["id"] = 0;
      }

      if(!$votes->isEmpty() && $withdrawal->isEmpty()) {
        $response["id"] = 2;
      }

      if(!$withdrawal->isEmpty()) {
        $response["id"] = 3;
        $response["amount"] = $withdrawal->first()->amount;
      }

      return response()->json($response);

    }
}
