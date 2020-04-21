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

}
