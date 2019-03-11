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
}
