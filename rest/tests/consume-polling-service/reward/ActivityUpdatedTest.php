<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class ActivityUpdatedTest extends TestCase
{
    use DatabaseTransactions;
    private $createActivity = [
        'asset_name' => 'jurRewards',
        'event_name' => 'ActivityCreated',
        'contract_address' => '0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a',
        'block_number' => 6606106,
        'transaction_hash' => '0xc94955fa2c69c2784d8e4c7264ee35d13e483d3c4d8436ebb2d761a20b5addc7',
        'sender' => '0x2d9241a6c709c8ba3a35c1ad17667641ffe27067',
        'timestamp' => 1592922345,
        'data' => ["name" => "Collect 100 Soda Bottle Cap !!!", "slotCount" => 5, "activityId" => 17, "rewardAmount" => "1000000000000000000", "whitelistContractAddresses" => []]
    ];

    private $body = [
        'asset_name' => 'jurRewards',
        'event_name' => 'ActivityUpdated',
        'contract_address' => '0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417',
        'block_number' => 6606106,
        'transaction_hash' => '0x6729cfe1d79a352897756e27206e125166a0f6a82014a159bf3e7f92ab1fdb4h',
        'sender' => '0x2d9241a6c709c8ba3a35c1ad17667641ffe27067',
        'timestamp' => 1592922345,
        'data' => ["activityId" => 17, "slotCount" => 4, "newState" => false]
    ];

    /**
     * @test
     *
     * @return void
     */
    public function should_have_valid_response_structure()
    {
        $this->post('api/v1/polling/reward', $this->createActivity);

        $this->post('api/v1/polling/reward', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'status'
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_have_valid_response()
    {
        $this->post('api/v1/polling/reward', $this->createActivity);

        $this->post('api/v1/polling/reward', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJson(
            [
                'status' => true // should insert first time
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_be_present_in_database()
    {

        $this->post('api/v1/polling/reward', $this->createActivity);

        $this->post('api/v1/polling/reward', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // validate database
        $this->seeInDatabase('reward_activities', [
            'sc_activity_id' => 17,
            'name' => "Collect 100 Soda Bottle Cap !!!",
            'reward_amount' => 1,
            'number_of_slots' => 4,
            'assigned_slots' => 0,
            'is_active' => 1
        ]);

        // change slot count to zero and accept is_active=0
        $this->body['data']['slotCount'] = 0;

        $this->post('api/v1/polling/reward', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // validate database
        $this->seeInDatabase('reward_activities', [
            'sc_activity_id' => 17,
            'name' => "Collect 100 Soda Bottle Cap !!!",
            'reward_amount' => 1,
            'number_of_slots' => 4,
            'assigned_slots' => 0,
            'is_active' => 0
        ]);
    }
}
