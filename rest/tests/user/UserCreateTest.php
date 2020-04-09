<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class UserCreateTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_create_user_without_wallet()
    {
        $this->post("api/v1/user", [])
            ->seeStatusCode(401);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_create_user_only_with_wallet()
    {

        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7';

        $this->post("api/v1/user", [], ['wallet' => $wallet]);

        // validate status
        $this->seeStatusCode(201);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'user' =>
                [
                    'id',
                    'wallet',
                    'updated_at',
                    'created_at',
                ],
            ]

        );

        // validate data present in database
        $this->seeInDatabase('users', ['wallet' => $wallet]);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_create_user_with_invalid_wallet()
    {
        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A'; // invalid address (missing last charecter)

        $this->post("api/v1/user", [], ['wallet' => $wallet])
            ->seeStatusCode(422);
    }

}
