<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\CustomPaginationTrait;
use App\Transformers\AdvocateTransformer;
use App\Transformers\SlotTransformer;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use \App\Models\Advocate;
use \App\Models\Reward;
use \App\Models\Slot;
use \App\Models\User;

class AdvocateController extends Controller
{
    use Helpers, CustomPaginationTrait;

    /**
     * GET all advocates
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $advocates = Advocate::get();

        return $this->response->paginator(
            $this->customPagination($advocates, $request),
            new AdvocateTransformer
        );
    }

    /**
     * GET single advocate using wallet address
     *
     * @param String $wallet
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, $wallet)
    {
        // get an advocate using wallet
        $advocate = Advocate::where('wallet', $wallet)->first();

        // get a user using wallet; fail if not found
        $user = User::where('wallet', $wallet)->firstOrFail();

        // get total rewarded amount for the wallet
        $rewardAmount = Reward::where('rewardee_wallet', $wallet)->sum('reward_amount');

        // get total assigned amount for the wallet
        $totalRewardAmount = Slot::where('assigned_wallet', $wallet)->sum('reward_amount');

        // get type of request
        $isPrivate = $wallet === $request->header('wallet');

        return [
            'meta' => ['isAdvocate' => isset($advocate)],
            'data' => [
                'id' => $wallet,
                'type' => isset($advocate) ? 'advocates' : 'users',
                'attributes' => [
                    'address' => $wallet,
                    'statusType' => isset($advocate) ? $advocate->type : null,
                    'activationTime' => isset($advocate) ? Carbon::instance($advocate->activation_time)->timestamp : null,
                    'country' => $user->location,
                    'linkedIn' => $user->linkedin,
                    'url' => $user->url,
                    'bio' => isset($advocate) ? $advocate->bio : null,
                    'rewardsBalance' => $totalRewardAmount - $rewardAmount,
                    'totalEarned' => $rewardAmount,
                    'totalAvailable' => $isPrivate ? $totalRewardAmount : null
                ]
            ]
        ];
    }

    /**
     * GET all available activities for a wallet
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function availableActivities(Request $request, $wallet)
    {
        // get type of request
        $isPrivate = $wallet === $request->header('wallet');

        if (!$isPrivate) {
            abort(404);
        }

        $slots = Slot::where('assigned_wallet', $wallet)->get();

        return $this->response->paginator(
            $this->customPagination($slots, $request),
            new SlotTransformer
        );
    }
}
