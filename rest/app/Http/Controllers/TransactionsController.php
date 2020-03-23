<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
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
            ->byWallet($wallet)->get();

        $lastBlockNumber = Transaction::max('block');

        $waitingColl = new Collection($waitingList, new TransactionTransformer);

        $fractal = new Manager();

        $waiting = $fractal->createData($waitingColl)->toArray();

        return response()->json(
            array_merge(
                ['lastBlockNumber' => $lastBlockNumber],
                ['waiting' => $waiting["data"]]
            )
        );
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
        $transaction = Transaction::findOrFail($id);

        $transaction->update($request->all());

        return $this->item($transaction, new TransactionTransformer);
        // return response()->json(compact('transaction'), 201);
    }
}
