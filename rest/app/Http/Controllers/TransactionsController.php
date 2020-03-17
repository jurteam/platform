<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    /**
     * Return the list of transactions.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getResolvableByWallet(Request $request)
    {
      $wallet = $request->header('wallet');

      $transactions = Transaction::notResolved()
        ->byWallet($wallet)->get();

        return response()->json(compact('transactions'));
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

        return response()->json(compact('transaction'), 201);
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

        return response()->json(compact('transaction'), 201);
    }
}
