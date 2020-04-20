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

}
