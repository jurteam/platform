<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Activity;
use App\Models\ContractStatusDetail;
use App\Models\ContractVote;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;
use App\Transformers\TransactionTransformer;

class TransactionsController extends Controller
{
    use Helpers;
    /**
     * Return the list of transactions.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getResolvableByWallet(Request $request)
    {
        $wallet = $request->header('wallet');

        $waitingList = Transaction::notResolved()
            ->mine($wallet)
            ->lockedByMeOrUnlocked($wallet)->get();


        return $this->response->collection($waitingList, new TransactionTransformer);
    }


    /**
     * Store a new transaction.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'txid' => 'unique:transactions,txid'
        ]);

        $transaction = Transaction::storeTransaction($request);

        return $this->item($transaction, new TransactionTransformer);
        // return response()->json(compact('transaction'), 201);
    }

    /**
     * Update transaction.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     */
    public function update(Request $request, $id)
    {
        $wallet = $request->header('wallet');
        $transaction = Transaction::lockedByMe($wallet)->findOrFail($id);

        if ($transaction->event == 'ContractDisputed') 
        {
            // remove waiting from activities, contract_status_details and contract_votes

            $contractId = $transaction->contract->id;

            Activity::where('waiting', '=', 1)
            ->where('contract_id','=',$contractId)
            ->update(['waiting' => 0]);

            ContractStatusDetail::where('waiting', '=', 1)
            ->where('contract_id','=',$contractId)
            ->update(['waiting' => 0]);

            ContractVote::where('waiting', '=', 1)
            ->where('contract_id','=',$contractId)
            ->update(['waiting' => 0]);
            
        }

        $transaction->update($request->all());

        return $this->item($transaction, new TransactionTransformer);
        // return response()->json(compact('transaction'), 201);
    }

    /**
     * Lock transaction.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     */
    public function lock(Request $request, $id)
    {
        $wallet = $request->header('wallet');
        $transaction = Transaction::findOrFail($id);
        $result = ($transaction->locked_by == $wallet);

        if ($transaction->locked_by == null ) 
        {
            $lowerWallet = strtolower($wallet);

            $result = $transaction->update(['locked_by' => $lowerWallet]);
        }

        return ['response' => $result];
    }

    /**
     * Unlock transaction.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     */
    public function unlock(Request $request, $id)
    {
        $wallet = $request->header('wallet');
        $lowerWallet = strtolower($wallet);

        $transaction = Transaction::findOrFail($id);

        $result = false;
        if ($transaction->locked_by == $lowerWallet ) 
        {
            $result = $transaction->update(['locked_by' => null]);
        }

        return ['response' => $result];
    }
}
