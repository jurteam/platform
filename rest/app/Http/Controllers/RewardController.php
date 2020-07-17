<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\CustomPaginationTrait;
use App\Transformers\RewardTransformer;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use \App\Models\Reward;

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
        $rewards = Reward::where('rewardee_wallet', $wallet)->get();

        return $this->response->paginator(
            $this->customPagination($rewards, $request),
            new RewardTransformer
        );
    }
}
