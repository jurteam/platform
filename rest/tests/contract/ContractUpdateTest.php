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

}