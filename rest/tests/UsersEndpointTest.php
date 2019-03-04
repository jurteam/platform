<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class UsersEndpointTest extends TestCase
{
    /**
     * @test
     *
     * @return void
     */
    public function a_request_without_wallet_header_cannot_be_authorized()
    {
        $response = $this->call('GET', 'api/v1/user');

        $this->assertEquals(401, $response->status());
    }

    /**
     * @test
     *
     * @return void
     */
    public function a_request_with_wrong_wallet_header_return_no_user()
    {
        $this->get('api/v1/user', [
            'wallet' => 'ahahahahahahaha'
        ])
        ->seeStatusCode(404);
    }

    /**
     * @test
     *
     * @return void
     */
    public function a_request_with_wallet_header_can_find_an_user()
    {
        $this->get('api/v1/user', [
            'wallet' => 'QHx5VJEg3zO2jseSEq8R/wtCljguCvHSMA49HQ1IWiI='
        ])
        ->seeStatusCode(200);
    }

    /**
     * @test
     *
     * @return void
     */
    public function a_request_with_wallet_header_if_doesnt_find_user_can_create_a_new_user()
    {
        $wallet = 'QHx5VJEg3zO2jseSEq8R/wtCljguCvHSMA49HQ1IWiI=';

        $user = factory(App\Models\User::class)->make();

        $this->post('api/v1/user', $user->toArray(), [
            'wallet' => $wallet
        ]);

        $this->seeInDatabase('users', ['wallet' => $wallet]);
    }

    /**
     * @test
     *
     * @return void
     */
    public function a_request_with_wallet_header_can_authorize_user_update()
    {
        $this->put('api/v1/user', [
            'location' => 'Lecce',
            'name' => 'Alice',
            'email' => 'mdpproduction@alice.it'
        ], [
            'wallet' => 'QHx5VJEg3zO2jseSEq8R/wtCljguCvHSMA49HQ1IWiI='
        ]);

        $this->seeInDatabase('users', ['location' => 'Lecce', 'name' => 'Alice']);
    }

    /**
     * @test
     *
     * @return void
     */
    public function a_request_with_wallet_header_can_authorize_to_delete_user()
    {
        $this->delete('api/v1/user', [], [
            'wallet' => 'QHx5VJEg3zO2jseSEq8R/wtCljguCvHSMA49HQ1IWiI='
        ])->seeJsonEquals([
            'status' => 'deleted',
         ]);
    }
}
