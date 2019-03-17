<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class ContractEndpointTest extends TestCase
{
    /**
     * @test
     *
     * @return void
     */
    public function a_registered_user_can_see_his_own_list_of_contracts()
    {
        $wallet = 'QHx5VJEg3zO2jseSEq8R/wtCljguCvHSMA49HQ1IWiI=';

        $this->get('api/v1/contracts', [
            'wallet' => $wallet
        ])->seeStatusCode(200);
    }

    /**
     * @test
     *
     * @return void
     */
    public function a_registered_user_can_create_a_contract()
    {
        $wallet = 'QHx5VJEg3zO2jseSEq8R/wtCljguCvHSMA49HQ1IWiI=';

        $this->post('api/v1/contracts', [
            'part_a_wallet' => 'QHx5VJEg3zO2jseSEq8R/wtCljguCvHSMA49HQ1IWiI=',
            'part_b_wallet' => 'asdhuasudhasidhuasuidhasuidhasdhui'
        ], [
            'wallet' => $wallet
        ])
        ->seeStatusCode(201);

        $this->seeInDatabase('contracts', [
            'part_a_wallet' => 'QHx5VJEg3zO2jseSEq8R/wtCljguCvHSMA49HQ1IWiI='
        ]);
    }

    /**
     * @test
     *
     * @return void
     */
    public function a_user_can_update_his_own_contract()
    {
        $user = factory(App\Models\User::class)->create();
        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id,
            'part_a_wallet' => $user->wallet
        ]);

        $this->put("api/v1/contracts/{$contract->id}", [
            'kpi' => 'test kpi',
            'category' => 'Test'
        ], [
            'wallet' => $user->wallet
        ]);

        $this->seeInDatabase('contracts', [
            'kpi' => 'test kpi',
            'category' => 'Test'
        ]);
    }
}
