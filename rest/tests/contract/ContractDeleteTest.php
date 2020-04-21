<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class ContractDeleteTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_delete_contract_without_wallet()
    {
        $user = factory(App\Models\User::class)->create();
        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id,
            'wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'part_a_wallet' => $user->wallet,
        ]);

        // get encoded id
        $id = encodeId($contract->id);

        // try to delete
        $this->delete("api/v1/contracts/{$id}", []);

        // validate status
        $this->seeStatusCode(401);

        $this->seeInDatabase('contracts', [
            'id' => $contract->id,
        ]);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_delete_contract_using_wallet_and_contract_id()
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

        // try to delete
        $this->delete("api/v1/contracts/{$id}", [], ['wallet' => $user->wallet]);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(['id']);

        // validate data
        $this->seeJson(
            [
                'id' => $id,
            ]
        );

        // validate data present in database
        $this->notSeeInDatabase('contracts', ['id' => $contract->id]);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_delete_contract_with_invalid_wallet()
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

        // try to delete
        $this->delete("api/v1/contracts/{$id}", [], ['wallet' => $user->wallet]);

        // validate status
        $this->seeStatusCode(422);

        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A']; // invalid wallet address (missing last charecter)

        $this->delete("api/v1/contracts", [], $header);

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

}
