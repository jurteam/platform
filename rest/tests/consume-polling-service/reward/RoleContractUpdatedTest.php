<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class RoleContractUpdatedTest extends TestCase
{
    use DatabaseTransactions;

    private $body = [
        'asset_name' => 'jurRewards',
        'event_name' => 'RoleContractUpdated',
        'contract_address' => '0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a',
        'block_number' => 6606106,
        'transaction_hash' => '0x6729cfe1d79a352897756e27206e125166a0f6a82014a159bf3e7f92ab1fdb4h',
        'sender' => '0x2d9241a6c709c8ba3a35c1ad17667641ffe27067',
        'timestamp' => 1592922345,
        'data' => ["contractAddress" => "0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417", "role" => "JUR_ADVOCATE", "status" => true]
    ];

    /**
     * @test
     *
     * @return void
     */
    public function should_have_valid_response_structure()
    {

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
    public function should_be_present_in_database()
    {

        $this->post('api/v1/polling/reward', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // validate database
        $this->seeInDatabase('role_contracts', [
            'contract_address' => '0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417',
            'role' => "JUR_ADVOCATE",
            'is_active' => 1
        ]);
    }
}
