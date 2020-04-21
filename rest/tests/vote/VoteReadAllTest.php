<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class VoteReadAllTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_read_vote_without_wallet()
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

        // create vote
        $this->get("api/v1/votes/{$id}", []);

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
    public function should_not_read_vote_with_invalid_wallet()
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

        // create vote
        $this->get("api/v1/votes/{$id}", ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A']); // invalid wallet address (missing last charecter)

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
