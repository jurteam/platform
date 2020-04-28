<?php

namespace App\Http\Controllers;

use Faker\Factory;
use Illuminate\Http\Request;

class OathKeeperController extends Controller
{
    // make available faker globally
    protected $faker;

    /**
     * Instantiate a new instance.
     */
    public function __construct()
    {
        $this->faker = Factory::create();
    }

    /**
     * GET analytical details of all cards for a period.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getCards(Request $request)
    {
        // convert duration string to number of days
        $days = $this->convertDurationToDays($request->input('duration'));

        // merge all cards and return to user
        return response()->json(
            [
                'data' =>
                [
                    [
                        'id' => 'average-amount',
                        'type' => 'cards',
                        'attributes' => $this->generateCard($days),
                    ],
                    [
                        'id' => 'amount-by-oath-keeper',
                        'type' => 'cards',
                        'attributes' => $this->generateCard($days),
                    ],
                    [
                        'id' => 'active-amount',
                        'type' => 'cards',
                        'attributes' => $this->generateCard($days),
                    ],
                    [
                        'id' => 'active-oath-keeper',
                        'type' => 'cards',
                        'attributes' => $this->generateCard($days),
                    ],
                ],
            ]
        );
    }

    /**
     * GET analytical details of a card based on card name for a period.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getCard(Request $request, $cardname)
    {
        // convert duration string to number of days
        $days = $this->convertDurationToDays($request->input('duration'));

        return response()->json(
            [
                'data' => [
                    'id' => $cardname,
                    'type' => 'cards',
                    'attributes' => $this->generateCard($days),
                ],
            ]
        );
    }

    /**
     * GET details of all oath takers based on rank index.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getOathTakers(Request $request)
    {
        // list of oath takers
        $oathTakers = [];

        // number of oaths to return
        $limit = $request->input('limit', 10);

        // minimum oath amount
        $minAmount = $request->input('minAmount', 1);

        //maximum oath amount
        $maxAmount = $request->input('maxAmount', 999999);

        // generate oath taker list
        for ($i = 1; $i <= $limit; $i++) {
            array_push($oathTakers, $this->generateOathTaker($i, $minAmount, $maxAmount));
        }

        // sort by
        $sortBy = $request->input('sortBy', 'Rank');

        // sort based on value
        switch ($sortBy) {
            case 'Amount':
                usort($oathTakers, function ($a, $b) {
                    return $b['amount'] - $a['amount'];
                });
                break;

            case 'OathCount':
                usort($oathTakers, function ($a, $b) {
                    return $b['oathCount'] - $a['oathCount'];
                });
                break;
        }

        return response()->json(
            [
                'meta' => ['total' => 1000],
                'data' => $oathTakers,
            ]);
    }

    /**
     * GET details of oath taker based on address.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getOathTaker(Request $request, $address)
    {
        return response()->json(
            [
                'data' =>
                [
                    'id' => $address,
                    'type' => "oath-takers",
                    'attributes' => ['rank' => $this->faker->numberBetween(0, 1000)],
                ],
            ]
        );
    }

    /**
     * Generate graph details of a card based on duration.
     *
     * @param  String $duration: duration in number of days
     * @return Array $GeneartedGraph: graph array
     * @return \Illuminate\Http\Response
     */
    private function generateGraphArray($days)
    {
        // two dimentional graph array : [index, value]
        $graph = [];

        // generate graph based on number days
        for ($i = 0; $i <= $days; $i++) {
            array_push($graph, [$i, $this->faker->numberBetween(0, 9999999)]); // add [index,value] to $graph variable
        }

        return $graph;
    }

    /**
     * Generate a card based on duration.
     *
     * @param  String $duration: duration in number of days
     * @return Array $GeneartedCard: card details
     */
    private function generateCard($days)
    {
        return [
            'value' => $this->faker->unique()->randomNumber(8),
            'delta' => $this->faker->numberBetween(-1000, 1000),
            'graph' => $this->generateGraphArray($days),
        ];
    }

    /**
     * Convert duration string to number of days.
     *
     * @param  String  $durationString
     * @return Number $duration
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

    /**
     * Generate single Oath Taker.
     *
     * @param  String  $durationString
     * @return Number $duration
     */
    private function generateOathTaker($rank, $minAmount, $maxAmount)
    {
        return [
            'id' => $this->faker->unique()->randomNumber(3),
            'type' => "oath-takers",
            'attributes' =>
            [
                'address' => '0x' . $this->faker->sha1,
                'rank' => $rank,
                'amount' => $this->faker->numberBetween($minAmount, $maxAmount),
                'oathCount' => $this->faker->numberBetween(1, 10),
            ],
        ];
    }
}
