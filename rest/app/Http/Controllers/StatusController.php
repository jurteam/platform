<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\CustomPaginationTrait;
use App\Models\Status;
use App\Models\User;
use App\Transformers\StatusTransformer;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    use Helpers, CustomPaginationTrait;

    /**
     * GET all Statuses.
     *
     * @param  Request  $request: Request object
     * @return \Illuminate\Http\Response
     */
    public function getHolders(Request $request)
    {
        $statuses = Status::get();

        return $this->response->paginator(
            $this->customPagination($statuses, $request),
            new StatusTransformer
        );
    }

    /**
     * GET details of single holder.
     *
     * @param  String  $wallet: wallet address
     * @return \Illuminate\Http\Response
     */
    public function getHolder($wallet)
    {
        $user = User::where('wallet', $wallet)->first();
        $data = Status::where('wallet', $wallet)->first();

        return response()->json(
            [
                'data' =>
                [
                    'id' => $wallet,
                    'type' => "holders",
                    'attributes' => [
                        'address' => $wallet,
                        'statusType' => isset($data) ? $data->status_type : null,
                        'activationTime' => isset($data) ? $data->activated_at : null,
                        'linkedIn' => isset($user) ? $user->linkedin : null,
                        'country' => isset($user) ? $user->country : null
                    ]
                ],
                'meta' => [
                    'isHolder' => isset($data) ? (bool) $data->is_active : false
                ]
            ]
        );
    }
}
