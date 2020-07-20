<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\CustomPaginationTrait;
use App\Transformers\RewardTransformer;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use \App\Models\Reward;
use \App\Models\Advocate;
use \App\Models\Slot;

class RewardController extends Controller
{
    use Helpers, CustomPaginationTrait;

    /**
     * GET all rewards based on wallet
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, $wallet)
    {
        $slots = Slot::where('assigned_wallet', $wallet)
        ->where('status', 'Rewarded')
        ->orWhere(function($query) {
            $query
            ->where('status', 'Completed')
            ->where('due_date', ">", Advocate::rewardDelay());
        })
        ->get();

        return $this->response->paginator(
            $this->customPagination($slots, $request),
            new RewardTransformer
        );
    }
}
