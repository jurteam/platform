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

}
