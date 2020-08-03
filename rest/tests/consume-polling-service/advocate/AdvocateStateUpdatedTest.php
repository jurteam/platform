<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class AdvocateStateUpdatedTest extends TestCase
{
    use DatabaseTransactions;

    private $body1 = [
        'asset_name' => 'jurAdvocate',
        'event_name' => 'AdvocateAdded',
        'contract_address' => '0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417',
        'block_number' => 6606106,
        'transaction_hash' => '0x6729cfe1d79a352897756e27206e125166a0f6a82014a159bf3e7f92ab1fdb4e',
        'sender' => '0x2d9241a6c709c8ba3a35c1ad17667641ffe27067',
        'timestamp' => 1592922345,
        'data' => ["wallet" => "0x2d9241a6c709c8ba3a35c1ad17667641ffe27067", "advocateType" => "Normal", "activationTime" => "1596092140"]
    ];

    private $body2 = [
        'asset_name' => 'jurAdvocate',
        'event_name' => 'AdvocateStateUpdated',
        'contract_address' => '0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417',
        'block_number' => 6606106,
        'transaction_hash' => '0xa4ac4bcd724719763699afe71eccf79d7ba751d62af5b0ecbf2bcb06a054a619',
        'sender' => '0x2d9241a6c709c8ba3a35c1ad17667641ffe27067',
        'timestamp' => 1592922345,
        'data' => ["wallet" => "0x2d9241a6c709c8ba3a35c1ad17667641ffe27067", "newState" => false]
    ];

    /**
     * @test
     *
     * @return void
     */
    public function should_have_valid_response_structure()
    {
        // add advocate
        $this->post('api/v1/polling/advocate', $this->body1);

        // validate status
        $this->seeStatusCode(200);

        // change status
        $this->post('api/v1/polling/advocate', $this->body2);

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
        $this->post('api/v1/polling/advocate', $this->body2);

        // validate status
        $this->seeStatusCode(404);

        $this->post('api/v1/polling/advocate', $this->body1);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJson(
            [
                'status' => true
            ]
        );

        $this->post('api/v1/polling/advocate', $this->body2);

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
        $this->post('api/v1/polling/advocate', $this->body1);

        // validate status
        $this->seeStatusCode(200);

        $this->post('api/v1/polling/advocate', $this->body2);

        // validate status
        $this->seeStatusCode(200);

        // validate database
        $this->seeInDatabase('users', ['wallet' => '0x2d9241a6c709c8ba3a35c1ad17667641ffe27067']);

        // validate database
        $this->seeInDatabase('advocates', [
            'wallet' => '0x2d9241a6c709c8ba3a35c1ad17667641ffe27067',
            'contract_address' => '0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417',
            'activation_time' => Carbon\Carbon::createFromTimestamp(1596092140),
            'is_active' => 0,
            'type' => 'Normal',
            'total_earned' => 0
        ]);
    }
}
