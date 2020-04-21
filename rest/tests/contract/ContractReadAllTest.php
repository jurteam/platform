<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class ContractReadAllTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_read_contract_without_wallet()
    {
        $this->get("api/v1/contracts", []);

        // validate status
        $this->seeStatusCode(401);

        // validate stucture of data
        $this->seeJsonStructure(['errors']);

        // validate response
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
