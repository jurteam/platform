<?php

use App\Models\RoleContract;
use Laravel\Lumen\Testing\DatabaseTransactions;

class ActivityCreatedTest extends TestCase
{
    use DatabaseTransactions;

    private $roleContractBody1 = [
        'asset_name' => 'jurRewards',
        'event_name' => 'RoleContractUpdated',
        'contract_address' => '0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a',
        'block_number' => 6606106,
        'transaction_hash' => '0x6729cfe1d79a352897756e27206e125166a0f6a82014a159bf3e7f92ab1fdb4h',
        'sender' => '0x2d9241a6c709c8ba3a35c1ad17667641ffe27067',
        'timestamp' => 1592922345,
        'data' => ["contractAddress" => "0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417", "role" => "JUR_ADVOCATE", "status" => true]
    ];

    private $roleContractBody2 = [
        'asset_name' => 'jurRewards',
        'event_name' => 'RoleContractUpdated',
        'contract_address' => '0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a',
        'block_number' => 6606106,
        'transaction_hash' => '0x6729cfe1d79a352897756e27206e125166a0f6a82014a159bf3e7f92ab1fdb4h',
        'sender' => '0x2d9241a6c709c8ba3a35c1ad17667641ffe27067',
        'timestamp' => 1592922345,
        'data' => ["contractAddress" => "0x26e82BEe7d1369c2969f7Fb9C33fB10926708850", "role" => "JUR_STATUS", "status" => true]
    ];

    private $body = [
        'asset_name' => 'jurRewards',
        'event_name' => 'ActivityCreated',
        'contract_address' => '0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a',
        'block_number' => 6606106,
        'transaction_hash' => '0xc94955fa2c69c2784d8e4c7264ee35d13e483d3c4d8436ebb2d761a20b5addc7',
        'sender' => '0x2d9241a6c709c8ba3a35c1ad17667641ffe27067',
        'timestamp' => 1592922345,
        'data' => ["name" => "Collect 100 Soda Bottle Cap !!!", "slotCount" => 5, "activityId" => 17, "rewardAmount" => "1000000000000000000", "whitelistContractAddresses" => ["0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417", "0x26e82BEe7d1369c2969f7Fb9C33fB10926708850"]]
    ];

    /**
     * @test
     *
     * @return void
     */
    public function should_have_valid_response_structure()
    {
        $this->post('api/v1/polling/reward', $this->roleContractBody1);

        $this->post('api/v1/polling/reward', $this->roleContractBody2);

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
        $this->post('api/v1/polling/reward', $this->roleContractBody1);

        $this->post('api/v1/polling/reward', $this->roleContractBody2);

        $this->post('api/v1/polling/reward', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJson(
            [
                'status' => true
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_assign_roles_for_multiple_whitelisted_contracts()
    {

        $this->post('api/v1/polling/reward', $this->roleContractBody1);

        $this->post('api/v1/polling/reward', $this->roleContractBody2);

        $this->post('api/v1/polling/reward', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // validate database
        $this->seeInDatabase('reward_activities', [
            'sc_activity_id' => 17,
            'name' => "Collect 100 Soda Bottle Cap !!!",
            'reward_amount' => 1,
            'number_of_slots' => 5,
            'assigned_slots' => 0,
            'is_active' => 1
        ]);

        // check role contract binding
        $role_contract1 = RoleContract::where('contract_address', '0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417')->first();

        // validate database
        $this->seeInDatabase('reward_activity_roles', ['role_contract_id' => $role_contract1->id]);

        // check role contract binding
        $role_contract2 = RoleContract::where('contract_address', '0x26e82BEe7d1369c2969f7Fb9C33fB10926708850')->first();

        // validate database
        $this->seeInDatabase('reward_activity_roles', ['role_contract_id' => $role_contract2->id]);

    }

    /**
     * @test
     *
     * @return void
     */
    public function should_validate_notifications()
    {

        $this->post('api/v1/polling/reward', $this->roleContractBody1);

        $this->post('api/v1/polling/reward', $this->roleContractBody2);

        // validate notification
        $this->expectsJobs(App\Jobs\NotifyNewRewardActivityAvailable::class);

        $this->post('api/v1/polling/reward', $this->body);

    }
}
