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

}
