<?php

namespace App\Http\Controllers;

use App\Models\Withdrawal;
use Illuminate\Http\Request;
use App\Transformers\WithdrawalTransformer;

class WithdrawalsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'contract_id' => 'required',
            'amount' => 'required',
            'wallet' => 'required',
            'type' => 'required|in:withdraw,payout'
        ]);

        $withdraw = Withdrawal::createWithdraw($request);

        return $this->item($withdraw, new WithdrawalTransformer);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Withdrawal  $withdrawal
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $withdraw = Withdrawal::findOrFail($id);

        return $this->item($withdraw, new WithdrawalTransformer);
    }
}
