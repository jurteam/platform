<?php

namespace App\Http\Controllers;

use App\Filters\OathKeeperFilters;
use App\Http\Controllers\Traits\CustomPaginationTrait;
use App\Models\OathAnalytics;
use App\Transformers\OathKeeperTransformer;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use \App\Models\Oath;
use \App\Models\OathKeeper;

class OathKeeperController extends Controller
{
    use Helpers, CustomPaginationTrait;

    /**
     * GET analytical details of all cards for a period.
     *
     * @param  Request  $request: Request object
     * @return \Illuminate\Http\Response
     */
    public function getCards(Request $request)
    {
        // get duration string
        $duration = $request->input('duration', 'Last Month');

        // Get all cards and return to user
        return response()->json(
            [
                'data' =>
                [
                    $this->getCardByDuration('average-amount', $duration),
                    $this->getCardByDuration('amount-by-oath-keeper', $duration),
                    $this->getCardByDuration('active-amount', $duration),
                    $this->getCardByDuration('active-oath-keeper', $duration)

                ]
            ]
        );
    }

    /**
     * GET analytical details of a card for a period based on name of the card.
     *
     * @param Request $request: Request object
     * @param String $cardname: Name of the card
     * @return \Illuminate\Http\Response
     */
    public function getCard(Request $request, $cardname)
    {
        // convert duration string to number of days
        $duration = $request->input('duration', 'Last Month');

        // Get the card and return
        return response()->json(["data" => $this->getCardByDuration($cardname, $duration)]);
    }

    /**
     * GET details of all oath takers based on rank index.
     *
     * @param OathKeeperFilters $filters: Filter object based on OathKeeperFilters
     * @param  Request  $request: Request object
     * @return \Illuminate\Http\Response
     */
    public function getOathTakers(OathKeeperFilters $filters, Request $request)
    {
        $oathKeepers = OathKeeper::filters($filters)
            ->get();

        return $this->response->paginator(
            $this->customPagination($oathKeepers, $request),
            new OathKeeperTransformer
        );

    }

    /**
     * GET details of oath taker based on address.
     *
     * @param Request  $request
     * @param $address: Wallet address of the oath taker
     * @return \Illuminate\Http\Response
     */
    public function getOathTaker(Request $request, $address)
    {
        $data = OathKeeper::where('wallet', $address)->pluck('rank')->first();
        return response()->json(
            [
                'data' =>
                [
                    'id' => $address,
                    'type' => "oath-takers",
                    'attributes' => ['rank' => $data]
                ]
            ]
        );
    }

    /**
     * Get Single Card by duration
     *
     * @param String $cardname: name of the card
     * @param String $duration: duration string
     * @return Object $GeneartedCard: card details
     */
    private function getCardByDuration($cardname, $duration)
    {
        return [
            'id' => $cardname,
            'type' => 'cards',
            'attributes' => OathAnalytics::where(['card' => $cardname, 'duration' => $duration])
                ->select('value', 'delta', 'graph')
                ->first()

        ];
    }
}
