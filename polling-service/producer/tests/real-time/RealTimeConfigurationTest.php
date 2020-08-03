<?php

use App\Models\Asset;
use Carbon\Carbon;
use Laravel\Lumen\Testing\DatabaseTransactions;

class RealTimeConfigurationTest extends TestCase
{
    use DatabaseTransactions;

    private $body = [
        'block_number' => 1000,
        'data' => [
            [
                'asset_name' => 'OathKeeper',
                'event_name' => 'OathTaken',
                'contract_address' => '0xD689Db4A731cbb216E81C2F6096c583e329A9B48',
                'transaction_hash' => '0xaed8fa7326b647add3ae85497222f7c82cb07f90c98247e24590d4232ade854c',
                'block_number' => 1000,
                'timestamp' => 1592922345,
                'sender' => '0x2D9241a6c709c8Ba3a35C1aD17667641FFE27067',
                'data' => [
                    '_beneficiary' => '0x32a0d45b3b59b7201f90F2Fe7D8867418e7aF74b',
                    '_amount' => '3',
                    '_lockInPeriod' => '5',
                    '_startAt' => '1590574340',
                    '_releaseAt' => '1590574640',
                    '_oathIndex' => '10'
                ]
            ]
        ]
    ];

    /**
     * @test
     *
     * @return void
     */
    public function should_rtr_configuration_have_valid_status_and_structure()
    {
        $count = Asset::count();

        $this->get('api/v1/polling-service/real-time');

        if ($count == 0) {
            // validate status
            $this->seeStatusCode(404);
            return;
        }

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'nextBlockNumber',
                'contracts' => [
                    [
                        'address',
                        'assetName',
                        'abi'
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
    public function should_rtr_store_valid_data_and_validate_response()
    {
        $this->json('POST', '/api/v1/polling-service/real-time', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(['nextBlockNumber']);

        // validate data
        $this->seeJson(['nextBlockNumber' => 1001]);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_validate_database_after_store()
    {
        $this->json('POST', '/api/v1/polling-service/real-time', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // validate database
        $this->seeInDatabase('transactions', [
            'asset_name' => 'OathKeeper',
            'event_name' => 'OathTaken',
            'contract_address' => '0xD689Db4A731cbb216E81C2F6096c583e329A9B48',
            'transaction_hash' => '0xaed8fa7326b647add3ae85497222f7c82cb07f90c98247e24590d4232ade854c',
            'block_number' => 1000,
            'timestamp' => Carbon::CreateFromTimeStamp(1592922345),
            'sender' => '0x2D9241a6c709c8Ba3a35C1aD17667641FFE27067'
        ]);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_insert_both_transactions_when_contract_address_are_different()
    {
        // try to insert first time
        $this->json('POST', '/api/v1/polling-service/real-time', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // clone $body
        $body = $this->body;

        // change contract address
        $body['data'][0]['contract_address'] = '0x2D9241a6c709c8Ba3a35C1aD17667641FFE27067';

        // try to insert second time with diffrent contract_address
        $this->json('POST', '/api/v1/polling-service/real-time', $body);

        // validate status
        $this->seeStatusCode(200);

        // validate database
        $this->seeInDatabase('transactions', ['event_name' => 'OathTaken',
            'contract_address' => '0xD689Db4A731cbb216E81C2F6096c583e329A9B48',
            'transaction_hash' => '0xaed8fa7326b647add3ae85497222f7c82cb07f90c98247e24590d4232ade854c']);

        // validate database
        $this->seeInDatabase('transactions', ['event_name' => 'OathTaken',
            'contract_address' => '0x2D9241a6c709c8Ba3a35C1aD17667641FFE27067',
            'transaction_hash' => '0xaed8fa7326b647add3ae85497222f7c82cb07f90c98247e24590d4232ade854c']);

    }

    /**
     * @test
     *
     * @return void
     */
    public function should_insert_both_transactions_when_event_names_are_different()
    {
        // try to insert first time
        $this->json('POST', '/api/v1/polling-service/real-time', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // clone $body
        $body = $this->body;

        // change contract address
        $body['data'][0]['event_name'] = 'iHoldYourOathFulfilled';

        // try to insert second time with diffrent contract_address
        $this->json('POST', '/api/v1/polling-service/real-time', $body);

        // validate status
        $this->seeStatusCode(200);

        // validate database
        $this->seeInDatabase('transactions', ['event_name' => 'OathTaken',
            'contract_address' => '0xD689Db4A731cbb216E81C2F6096c583e329A9B48',
            'transaction_hash' => '0xaed8fa7326b647add3ae85497222f7c82cb07f90c98247e24590d4232ade854c']);

        // validate database
        $this->seeInDatabase('transactions', ['event_name' => 'iHoldYourOathFulfilled',
            'contract_address' => '0xD689Db4A731cbb216E81C2F6096c583e329A9B48',
            'transaction_hash' => '0xaed8fa7326b647add3ae85497222f7c82cb07f90c98247e24590d4232ade854c']);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_insert_both_transactions_when_transaction_hashes_are_different()
    {
        // try to insert first time
        $this->json('POST', '/api/v1/polling-service/real-time', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // clone $body
        $body = $this->body;

        // change contract address
        $body['data'][0]['transaction_hash'] = '0xaed8fa7326b647add3ae85497222f7c82cb07f90c98247e24590d4232c4d61cd';

        // try to insert second time with diffrent contract_address
        $this->json('POST', '/api/v1/polling-service/real-time', $body);

        // validate status
        $this->seeStatusCode(200);

        // validate database
        $this->seeInDatabase('transactions', ['event_name' => 'OathTaken',
            'contract_address' => '0xD689Db4A731cbb216E81C2F6096c583e329A9B48',
            'transaction_hash' => '0xaed8fa7326b647add3ae85497222f7c82cb07f90c98247e24590d4232ade854c']);

        // validate database
        $this->seeInDatabase('transactions', ['event_name' => 'OathTaken',
            'contract_address' => '0xD689Db4A731cbb216E81C2F6096c583e329A9B48',
            'transaction_hash' => '0xaed8fa7326b647add3ae85497222f7c82cb07f90c98247e24590d4232c4d61cd']);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_insert_same_transactions_multiple_times()
    {
        // try to insert first time
        $this->json('POST', '/api/v1/polling-service/real-time', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // try to insert second time
        $this->json('POST', '/api/v1/polling-service/real-time', $this->body);

        // validate status
        $this->seeStatusCode(200);

        // validate database
        $this->seeInDatabase('transactions', ['event_name' => 'OathTaken',
            'contract_address' => '0xD689Db4A731cbb216E81C2F6096c583e329A9B48',
            'transaction_hash' => '0xaed8fa7326b647add3ae85497222f7c82cb07f90c98247e24590d4232ade854c']);
    }

}
