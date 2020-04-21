<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class VoteCreateTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_create_vote_without_wallet()
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

        // create dispute
        $this->post("api/v1/contracts/disputes/{$id}", ['code' => 35], ['wallet' => $wallet]);

        // validate status
        $this->seeStatusCode(200);

        $data = [
            'contract_id' => $id,
            'amount' => 10,
            'oracle_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'wallet_part' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'message' => 'hello',
            'hash' => 123,
        ];

        // create vote
        $this->post("api/v1/votes", $data, []);

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
    public function should_not_create_vote_only_with_wallets()
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

        // create dispute
        $this->post("api/v1/contracts/disputes/{$id}", ['code' => 35], ['wallet' => $wallet]);

        // validate status
        $this->seeStatusCode(200);

        $data = [
            'contract_id' => $id,
            'amount' => 10,
            'oracle_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'wallet_part' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'message' => 'hello',
            'hash' => 123,
        ];

        // create vote
        $this->post("api/v1/votes", [], ['wallet' => $wallet]);

        // validate status
        $this->seeStatusCode(422);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_create_contract_with_valid_data()
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

        // create dispute
        $this->post("api/v1/contracts/disputes/{$id}", ['code' => 35], ['wallet' => $wallet]);

        // validate status
        $this->seeStatusCode(200);

        $data = [
            'contract_id' => $id,
            'amount' => 10,
            'oracle_wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'wallet_part' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7',
            'message' => 'hello',
            'hash' => 123,
        ];

        // create vote
        $this->post("api/v1/votes", $data, ['wallet' => $wallet]);

        // validate status
        $this->seeStatusCode(200);
    }
}
