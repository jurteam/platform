<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use App\Models\ContractStatusDetail;

class ContractDetailsController extends Controller
{
    /**
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, $id)
    {
        $detail = new ContractStatusDetail($request->all())

        $detail->contract()
                ->associate(Contract::findOrFail($id))
                ->save();

        return response()->json(compact('detail'), 201);
    }

    /**
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadMedia(Request $request, $id)
    {
        $detail = ContractStatusDetail::findOrFail($id);
        $detail
            ->addMultipleMediaFromRequest($request->evidences)
            ->each(function($fileAdder) {
                $fileAdder->toMediaCollection('evidences');
            });

        return respon()->json([
            'evidences' => $detail->getMedia()
        ]);
    }
}
