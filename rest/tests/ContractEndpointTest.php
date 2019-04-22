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
    public function an_user_can_filters_own_contract_by()
    {
        $from = '2019-02-10';
        $to = '2019-03-20';

        $this->get("api/v1/contracts?from={$from}&to={$to}", [
            'wallet' => 'QHx5VJEg3zO2jseSEq8R/wtCljguCvHSMA49HQ1IWiI='
        ])->seeStatusCode(200);
    }

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
        $wallet = 'dIRyZgmIQPam4zGpeR3nKBtUYhoGjD';
        factory(App\Models\User::class)->create([
            'wallet' => $wallet
        ]);

        $this->post('api/v1/contracts', [
            'part_a_wallet' => 'dIRyZgmIQPam4zGpeR3nKBtUYhoGjD',
            'part_b_wallet' => 'asdhuasudhasidhuasuidhasuidhasdhui'
        ], [
            'wallet' => $wallet
        ])
        ->seeStatusCode(200);

        $this->seeInDatabase('contracts', [
            'part_a_wallet' => 'dIRyZgmIQPam4zGpeR3nKBtUYhoGjD',
            'wallet' => 'dIRyZgmIQPam4zGpeR3nKBtUYhoGjD'
        ]);

        $this->seeInDatabase('activities', [
            'status' => 'Draft',
            'status_code' => 0
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

    /**
     * @test
     *
     * @return void
     */
    public function a_user_can_set_own_contract_as_dispute()
    {
        $contract = factory(App\Models\Contract::class)->create([
            'wallet' => 'dIRyZgmIQPam4zGpeR3nKBtUYhoGjD',
            'part_a_wallet' => 'dIRyZgmIQPam4zGpeR3nKBtUYhoGjD'
        ]);

        $response = $this->post("api/v1/contracts/disputes/{$contract->id}", [
            'code' => 31,
            'contract_part' => 'dIRyZgmIQPam4zGpeR3nKBtUYhoGjD',
            'proposal_part_a' => 12.0000,
            'proposal_part_b' => 60.0000
        ], [
            'wallet' => 'dIRyZgmIQPam4zGpeR3nKBtUYhoGjD'
        ]);

        $this->seeInDatabase('contract_status_details', [
            'contract_id' => $contract->id
        ]);
    }
}
