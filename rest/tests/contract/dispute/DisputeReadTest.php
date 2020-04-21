<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class DisputeReadTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_read_single_dispute_without_wallet()
    {
        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A6';

        $user = factory(App\Models\User::class)->create();

        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id,
            'wallet' => $wallet,
            'part_a_wallet' => $user->wallet,
        ]);

        // validate data present in database
        $this->seeInDatabase('contracts', ['id' => $contract->id]);

        // get encoded id
        $id = encodeId($contract->id);

        // create an activity with attachment
        $dispute = $this->get("api/v1/contracts/disputes/{$id}", []);

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
    public function should_not_read_single_dispute_with_invalid_wallet()
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

        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A']; // invalid wallet address (missing last charecter)

        // create an activity with attachment
        $dispute = $this->get("api/v1/contracts/disputes/{$id}", []);

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
    public function should_not_read_single_dispute_with_non_existing_wallet()
    {
        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A5'; // non-existing wallet address

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

        // try to get details with invalid wallet
        $this->get("api/v1/contracts/disputes/{$id}", [], ['wallet' => $wallet])
            ->seeStatusCode(401);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_read_single_dispute_with_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616AA'];

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

        // create dispute
        $this->post("api/v1/contracts/disputes/{$id}", ['code' => 35], $header);

        // validate status
        $this->seeStatusCode(200);

        // get dispute
        $this->get("api/v1/contracts/disputes/{$id}", $header);

        // validate status
        $this->seeStatusCode(200);
    }
}
