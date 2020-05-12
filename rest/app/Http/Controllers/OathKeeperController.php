<?php

namespace App\Http\Controllers;

use App\Filters\OathKeeperFilters;
use App\Http\Controllers\Traits\CustomPaginationTrait;
use App\Transformers\OathKeeperTransformer;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use \App\Models\Oath;
use \App\Models\OathKeeper;
use \Carbon\Carbon;

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
        // convert duration string to number of days
        $days = $this->convertDurationToDays($request->input('duration'));
        $from = Carbon::now()->subDays($days);
        $to = Carbon::now();

        // merge all cards and return to user
        return response()->json(
            [
                'data' =>
                [
                    $this->generateCard('average-amount', $from, $to),
                    $this->generateCard('amount-by-oath-keeper', $from, $to),
                    $this->generateCard('active-amount', $from, $to),
                    $this->generateCard('active-oath-keeper', $from, $to)

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
        $days = $this->convertDurationToDays($request->input('duration'));
        $from = Carbon::now()->subDays($days);
        $to = Carbon::now();

        return response()->json(["data" => $this->generateCard($cardname, $from, $to)]);
    }

    /**
     * Generate Single Card
     *
     * @param String $cardname: name of the card
     * @param Date $from: from date
     * @param Date $to: to date
     * @return Array $GeneartedCard: card details
     */
    private function generateCard($cardname, $from, $to)
    {
        $card = [];

        switch ($cardname) {
            case 'average-amount':
                $card = Oath::averageAmount($from, $to);
                break;
            case 'active-amount':
                $card = Oath::activeAmount($from, $to);
                break;
            case 'amount-by-oath-keeper':
                $card = Oath::amountByOathKeeper($from, $to);
                break;
            case 'active-oath-keeper':
                $card = Oath::activeOathKeepers($from, $to);
                break;
        }

        return [
            'id' => $cardname,
            'type' => 'cards',
            'attributes' => $card
        ];
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
     * Convert duration string to number of days.
     *
     * @param  String  $durationString: Duration in string
     * @return Number $duration: Duration in days
     */
    private function convertDurationToDays($duration)
    {
        $days = 30; // default is Last Month = Today + 30 days

        switch ($duration) {
            case '6 Months':
                $days = 180; // Today + 180 days
                break;

            case 'Year':
                $days = 365; // Today + 365 days
                break;
        }

        return $days;
    }
}
