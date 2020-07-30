<?php

use App\Models\RewardActivity;
use Laravel\Lumen\Testing\DatabaseTransactions;

class SlotAssignedTest extends TestCase
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
        'event_name' => 'SlotAssigned',
        'contract_address' => '0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417',
        'block_number' => 6606106,
        'transaction_hash' => '0x56a803c46660c3edbe7f10eafc1e074c81ff92111fd7e0afdcecc8bd8c581a9b',
        'sender' => '0x2d9241a6c709c8ba3a35c1ad17667641ffe27067',
        'timestamp' => 1592922345,
        'data' => ["slotId" => "0", "dueDate" => "2542802222", "createdAt" => "1596117470", "activityId" => "17", "assignedTo" => "0x2D9241a6c709c8Ba3a35C1aD17667641FFE27067"]
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

        $activity = RewardActivity::where('sc_activity_id', 17)->firstOrFail();

        // validate database
        $this->seeInDatabase('slots', [
            'reward_activity_id' => $activity->id,
            'sc_slot_id' => 0,
            'assigned_wallet' => '0x2D9241a6c709c8Ba3a35C1aD17667641FFE27067',
            'reward_amount' => 1,
            'status' => 'Assigned',
            'due_date' => Carbon\Carbon::createFromTimestamp(2542802222)
        ]);
    }
}
