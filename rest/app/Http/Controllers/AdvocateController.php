<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\CustomPaginationTrait;
use App\Transformers\AdvocateTransformer;
use App\Transformers\RewardActivityAvailableTransformer;
use App\Transformers\SlotOnGoingTransformer;
use Carbon\Carbon;
use DB;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use \App\Models\Advocate;
use \App\Models\Reward;
use \App\Models\RewardActivity;
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

        // rewards balance is the list of slots assigned to the wallet (apart from the Rewarded ones)
        $rewardsBalance = Slot::where('assigned_wallet', $wallet)
            ->where('status', '!=', 'Rewarded')
            ->where('status', '!=', 'Cancelled')
            ->where('status', '!=', 'Unassigned')
            ->sum('reward_amount');

        // aggregates all the rewards assigned to the wallet
        $totalEarned = Reward::where('rewardee_wallet', $wallet)->sum('reward_amount');

        // sum amount of all slots
        $totalAmount = RewardActivity::where('is_active', true)->sum(DB::raw('number_of_slots * reward_amount'));

        // sum amount of Alloted slots
        $totalAlloted = Slot::where('status', '!=', 'Cancelled')
            ->where('status', '!=', 'Unassigned')
            ->sum('reward_amount');

        // get type of request
        $isPrivate = $wallet === $request->header('wallet');

        return [
            'meta' => ['isAdvocate' => isset($advocate)],
            'data' => [
                'id' => $wallet,
                'type' => isset($advocate) ? 'advocates' : 'users',
                'attributes' => [
                    'name' => $user->name,
                    'address' => $wallet,
                    'statusType' => isset($advocate) ? $advocate->type : null,
                    'activationTime' => isset($advocate) ? Carbon::createFromDate($advocate->activation_time)->timestamp : null,
                    'country' => $user->location,
                    'linkedIn' => $user->linkedin,
                    'url' => $user->url,
                    'bio' => isset($advocate) ? $advocate->bio : null,
                    'rewardsBalance' => (float) $rewardsBalance,
                    'totalEarned' => (float) $totalEarned,
                    'totalAvailable' => $isPrivate ? ((float) $totalAmount) - ((float) $totalAlloted) : null
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

        // get all activities that doesn't have any roles (no role means available to all)
        $rewardActivitiesForAllUsers = RewardActivity::whereNotIn('id', DB::table('reward_activity_roles')
                ->distinct('reward_activity_id')
                ->pluck('reward_activity_id'))
            ->where('is_active', true);

        // get an advocate using wallet address
        $advocate = Advocate::where('wallet', $wallet)->first();

        // get all activities based on roles & merge no-role activities
        $rewardActivities = RewardActivity::with('roleContracts')
            ->where('is_active', true)
            ->whereHas('roleContracts', function ($query) use ($advocate) {
                if (isset($advocate)) {
                    $query->where('contract_address', $advocate->contract_address)
                        ->where('is_active', true);
                } else {
                    $query->where('contract_address', '0'); // ignoring the query
                }
            })
            ->union($rewardActivitiesForAllUsers)
            ->orderBy('updated_at', 'desc')
            ->get();

        // return response
        return $this->response->paginator(
            $this->customPagination($rewardActivities, $request),
            new RewardActivityAvailableTransformer
        );
    }

    /**
     * GET all ongoing activities for a wallet
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function ongoingActivities(Request $request, $wallet)
    {
        // get type of request
        $isPrivate = $wallet === $request->header('wallet');

        if (!$isPrivate) {
            abort(404);
        }

        $slots = Slot::where('assigned_wallet', $wallet)->where(function ($query) {
            $query->where('status', 'Assigned')
                ->orWhere('status', 'OverDue')
                ->orWhere('status', 'Completed');
        })->get();

        return $this->response->paginator(
            $this->customPagination($slots, $request),
            new SlotOnGoingTransformer
        );
    }

    /**
     * PUT update bio of an advocate
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $wallet)
    {

        $advocate = Advocate::where('wallet', $wallet)->firstOrFail();

        $advocate->bio = $request->input('bio');

        $advocate->save();

        return '';
    }
}
