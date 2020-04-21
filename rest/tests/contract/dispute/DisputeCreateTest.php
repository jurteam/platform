<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class DisputeCreateTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_create_dispute_without_wallet_and_code()
    {
        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7';

        // create user
        $user = factory(App\Models\User::class)->create([
            'wallet' => $wallet,
        ]);

        // create a contract
        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id,
        ]);

        // get encoded id
        $id = encodeId($contract->id);

        $this->post("api/v1/contracts/disputes/{$id}", [], []);

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
    public function should_create_dipute_only_with_code_and_wallet()
    {

        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7'];

        // create user
        $user = factory(App\Models\User::class)->create($header);

        // create a contract
        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id,
        ]);

        // get encoded id
        $id = encodeId($contract->id);

        $this->post("api/v1/contracts/disputes/{$id}", ['code' => 35], $header);

        // validate status
        $this->seeStatusCode(200);

    }
}
