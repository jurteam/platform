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

    /**
     * @test
     *
     * @return void
     */
    public function should_not_read_contract_with_invalid_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A']; // invalid wallet address (missing last charecter)

        $this->get("api/v1/contracts", $header);

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
    public function should_not_read_contract_with_non_existing_wallet()
    {
        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A5'; // non-existing wallet address

        $this->get("api/v1/contracts", [], ['wallet' => $wallet])
            ->seeStatusCode(401);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_read_contract_with_blank_data()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616AA'];

        // get contracts
        $this->get("api/v1/contracts", $header);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'data',
                'meta' =>
                [
                    "pagination" => [
                        "total",
                        "count",
                        "per_page",
                        "current_page",
                        "total_pages",
                        "links",
                    ],
                ],
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_read_contract_with_data()
    {
        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7';

        // create contract
        $this->post("api/v1/contracts",
            [
                'wallet' => $wallet,
                'part_a_wallet' => $wallet,
                'part_b_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A1',
            ],
            ['wallet' => $wallet]
        );

        // validate status
        $this->seeStatusCode(200);

        // get contract
        $this->get("api/v1/contracts", ['wallet' => $wallet]);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'data' =>
                [
                    [
                        "id",
                    ],
                ],
                'meta' =>
                [
                    "pagination" => [
                        "total",
                        "count",
                        "per_page",
                        "current_page",
                        "total_pages",
                        "links",
                    ],
                ],
            ]
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_read_contract_with_filter_by_dates()
    {
        $from = '2019-02-10';
        $to = '2019-03-20';

        $this->get("api/v1/contracts?from={$from}&to={$to}", [
            'wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A1',
        ])->seeStatusCode(200);
    }
}
