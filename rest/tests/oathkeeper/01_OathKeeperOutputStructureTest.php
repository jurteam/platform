<?php

use App\Jobs\GenerateOathKeeperAnalytics;
use App\Jobs\GenerateOathKeeperRank;
use Laravel\Lumen\Testing\DatabaseTransactions;
use \App\Models\OathKeeper;

class OathKeeperOutputStructureTest extends TestCase
{
    use DatabaseTransactions;

    protected static $oathKeepers;
    protected static $oaths;

    /**
     * Create a new instance.
     *
     * @return void
     */

    public function setUp(): void
    {
        parent::setUp();

        self::$oathKeepers = factory(App\Models\OathKeeper::class, 2)->create()->each(function ($oathKeeper) {
            self::$oaths[$oathKeeper->id] = factory(App\Models\Oath::class, rand(2, 10))->create([
                'wallet' => $oathKeeper->wallet,
                'oath_keeper_id' => $oathKeeper->id
            ]);
            OathKeeper::calculateSummary($oathKeeper);
            $rank = new GenerateOathKeeperRank($oathKeeper);
            $rank->handle();
        });

        $analytics = new GenerateOathKeeperAnalytics;
        $analytics->handle();
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_oath_takers_have_valid_structure()
    {

        $this->get('api/v1/oath-keeper/oath-takers');

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'data' => [
                    [
                        'id',
                        'type',
                        'attributes' => [
                            'address',
                            'rank',
                            'amount',
                            'oathCount'
                        ]
                    ]
                ],
                'meta' => [
                    'pagination' => [
                        'total',
                        'count',
                        'per_page',
                        'current_page',
                        'total_pages',
                        'links'
                    ]
                ]
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_single_oath_taker_have_valid_structure()
    {

        $this->get('api/v1/oath-keeper/oath-takers/0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7');

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'data' => [
                    'id',
                    'type',
                    'attributes' => ['rank']

                ]
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_analytics_have_valid_structure()
    {

        $this->get('api/v1/oath-keeper/analytics');

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'data' => [
                    [
                        "id",
                        "type",
                        "attributes" => ['value', 'delta', 'graph']
                    ],
                    [
                        "id",
                        "type",
                        "attributes" => ['value', 'delta', 'graph']
                    ],
                    [
                        "id",
                        "type",
                        "attributes" => ['value', 'delta', 'graph']
                    ],
                    [
                        "id",
                        "type",
                        "attributes" => ['value', 'delta', 'graph']
                    ]
                ]
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_analytics_single_card_have_valid_structure()
    {

        $this->get('api/v1/oath-keeper/analytics/average-amount');

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'data' => [
                    "id",
                    "type",
                    "attributes" => ['value', 'delta', 'graph']
                ]
            ]
        );
    }
}
