<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class ContractUpdateTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_update_contract_without_wallet()
    {
        $user = factory(App\Models\User::class)->create();
        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id,
            'wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'part_a_wallet' => $user->wallet,
        ]);

        // validate data present in database
        $this->seeInDatabase('contracts', ['id' => $contract->id]);

        // get encoded id
        $id = encodeId($contract->id);

        $this->put("api/v1/contracts/{$id}", []);

        // validate status
        $this->seeStatusCode(401);

        // validate stucture of data
        $this->seeJsonStructure(['errors']);

        // validate data
        $this->seeJson(
            [
                'errors' =>
                [
                    'wallet' => ['The wallet is missing.'],
                ],
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_update_contract_with_invalid_id()
    {
        $user = factory(App\Models\User::class)->create();
        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id,
            'wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'part_a_wallet' => $user->wallet,
        ]);

        // validate data present in database
        $this->seeInDatabase('contracts', ['id' => $contract->id]);

        // wrong id
        $id = "123456"; // wrong format

        $this->put("api/v1/contracts/{$id}", [], ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7']);

        // validate status
        $this->seeStatusCode(422);

        // validate stucture of data
        $this->seeJsonStructure(['errors']);

        // validate data
        $this->seeJson(
            [
                'errors' =>
                [
                    'id' => ['The Id is in invalid format.'],
                ],
            ]
        );

        // wrong id
        $id = "lX8Zw4"; // non existing id

        $this->put("api/v1/contracts/{$id}", [], ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7']);

        // validate status
        $this->seeStatusCode(422);

        // validate stucture of data
        $this->seeJsonStructure(['errors']);

        // validate data
        $this->seeJson(
            [
                'errors' =>
                [
                    'id' => ['The Id is invalid.'],
                ],
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_update_contract_with_invalid_wallet()
    {
        $header1 = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A']; // invalid wallet address (missing last charecter)

        $header2 = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A6']; // non existing wallet

        $user = factory(App\Models\User::class)->create();

        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id,
            'wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'part_a_wallet' => $user->wallet,
        ]);

        // validate data present in database
        $this->seeInDatabase('contracts', ['id' => $contract->id]);

        // get encoded id
        $id = encodeId($contract->id);

        $this->put("api/v1/contracts/{$id}", $header1);

        // validate status
        $this->seeStatusCode(422);

        // validate error details
        $this->seeJson(
            [
                'errors' =>
                [
                    'wallet' => ['The wallet is not valid.'],
                ],
            ]
        );

        $this->put("api/v1/contracts/{$id}", $header2);

        // validate status
        $this->seeStatusCode(404);

        // validate error details
        $this->seeJson(
            [
                'errors' =>
                [
                    'wallet' => ['The wallet not exists.'],
                ],
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_update_contract_with_valid_data()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616AA'];

        $data = [
            'part_a_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'part_b_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A1',
            'part_a_name' => 'Alice',
            'part_a_email' => 'alice_in_wonderland@gmail.com',
            'part_b_name' => 'Bob',
            'part_b_email' => 'bob_in_thailand@gmail.com',
            'kpi' => 'freelance aggreement',
            'category' => 'General',
            'who_pays' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'value' => 100,
            'has_penalty_fee' => 0,
        ];

        // create contract
        $user = factory(App\Models\User::class)->create();

        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id,
            'wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'part_a_wallet' => $user->wallet,
        ]);

        // validate data present in database
        $this->seeInDatabase('contracts', ['id' => $contract->id]);

        // get encoded id
        $id = encodeId($contract->id);

        // update contract with data
        $this->put("api/v1/contracts/{$id}", $data, $header);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'data' =>
                [
                    "id",
                    "statusId",
                    "statusLabel",
                    "statusUpdatedAt",
                    "statusFrom",
                    "statusPart",
                    "contractName",
                    "duration" => [
                        "days",
                        "hours",
                        "minutes",
                    ],
                    "expireAlertFrom",
                    "counterparties" => [
                        [
                            "wallet",
                            "name",
                            "email",
                            "renderName",
                        ],
                        [
                            "wallet",
                            "name",
                            "email",
                            "renderName",
                        ],
                    ],
                    "value",
                    "whoPays",
                    "address",
                    "kpi",
                    "resolutionProof",
                    "category",
                    "inCaseOfDispute",
                    "hasPenaltyFee",
                    "partAPenaltyFee",
                    "partBPenaltyFee",
                    "isDispute",
                    "isFriendlyResolution",
                ],
            ]
        );

        // validate data present in database
        $this->seeInDatabase('contracts', array_merge($data, $header));
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_update_contract_with_invalid_data()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A1'];

        $data = [
            'part_a_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc96', // invalid address
            'part_b_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A1',
            'part_a_email' => 'alice_in_wonderland', // invalid email
            'value' => 'nil', // not a number
            'has_penalty_fee' => 'nil', // not boolean
        ];

        // create contract
        $user = factory(App\Models\User::class)->create();

        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id,
            'wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'part_a_wallet' => $user->wallet,
        ]);

        // validate data present in database
        $this->seeInDatabase('contracts', ['id' => $contract->id]);

        // get encoded id
        $id = encodeId($contract->id);

        // update contract with data
        $this->put("api/v1/contracts/{$id}", $data, $header);

        // validate status
        $this->seeStatusCode(422);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'errors' =>
                [
                    'part_a_wallet',
                    'part_a_email',
                    'value',
                    'has_penalty_fee',
                ],
            ]
        );

        // validate data
        $this->seeJson(
            [
                'errors' =>
                [
                    'part_a_wallet' => ['The Part A Wallet is not valid'],
                    'part_a_email' => ['The Part A Email is not valid'],
                    'value' => ['The Value must be a number'],
                    'has_penalty_fee' => ['The Has Penalty Fee nust be boolean'],
                ],
            ]
        );
    }
}
