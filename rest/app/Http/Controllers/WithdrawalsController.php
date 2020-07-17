<?php

namespace App\Http\Controllers;

use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Transformers\WithdrawalTransformer;

class WithdrawalsController extends Controller
{
    use Helpers;

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $this->validate($request, [
            'amount' => 'required',
            'type' => 'required|in:withdraw,payout'
        ]);

        $idc = decodeId($id);      

        $withdraw = Withdrawal::createWithdraw($idc, $request);

        return $this->response->item($withdraw, new WithdrawalTransformer);
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
