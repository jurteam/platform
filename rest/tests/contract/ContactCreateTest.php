<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class ContractCreateTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_create_contract_without_registred_user()
    {
        $this->post("api/v1/contracts",
            [
                'part_a_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
                'part_b_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A1',
            ],
            ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A6']// non existing wallet
        );

        // validate status
        $this->seeStatusCode(422);

        // validate stucture of data
        $this->seeJsonStructure(['errors']);

        // validate data
        $this->seeJson(
            [
                'errors' =>
                [
                    'user_id' => ['The User Id is not valid'],
                ],
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_create_contract_without_wallet()
    {
        $this->post("api/v1/contracts", []);

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
    public function should_not_create_contract_without_part_a_and_b_wallets()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A4'];

        $this->post("api/v1/contracts", [], $header);

        // validate status
        $this->seeStatusCode(422);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                "message",
                "errors" => [
                    "part_a_wallet",
                    "part_b_wallet",
                ],
                "status_code",
            ]
        );

        // validate data
        $this->seeJson(
            [
                "message" => "The given data was invalid.",
                "errors" => [
                    "part_a_wallet" => [
                        "The part a wallet field is required.",
                    ],
                    "part_b_wallet" => [
                        "The part b wallet field is required.",
                    ],
                ],
                "status_code" => 422,
            ]
        );

        // validate data not present in database
        $this->notSeeInDatabase('contracts', $header);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_create_contract_only_with_party_a_and_b_wallets()
    {

        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7'];

        $this->post("api/v1/contracts",
            [
                'part_a_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
                'part_b_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A1',
            ],
            $header
        );

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
        $this->seeInDatabase('contracts', $header);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_create_contract_with_invalid_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A']; // invalid wallet address (missing last charecter)

        $this->post("api/v1/contracts",
            [
                'accepted_terms' => 1,
                'accepted_disclaimer' => 1,
            ],
            $header
        );

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
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_create_contract_with_valid_data()
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

        $this->post("api/v1/contracts", $data, $header);

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
    public function should_not_create_contract_with_invalid_data()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A1'];

        $data = [
            'part_a_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc96', // invalid address
            'part_b_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A1',
            'part_a_email' => 'alice_in_wonderland', // invalid email
            'value' => 'nil', // not a number
            'has_penalty_fee' => 'nil', // not boolean
        ];

        $this->post("api/v1/contracts", $data, $header);

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

        // validate data not present in database
        $this->notSeeInDatabase('contracts', $header);
    }
}
