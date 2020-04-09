<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class UserDeleteTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_delete_user_without_wallet()
    {
        $this->delete("api/v1/user", [])
            ->seeStatusCode(401);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_delete_user_name_using_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7'];

        // create user
        $this->post("api/v1/user", [], $header);

        // validate status of create
        $this->seeStatusCode(201);

        // validate data present in database
        $this->seeInDatabase('users', $header);

        // update existing user's name
        $this->delete("api/v1/user", [], $header);

        // validate status of update
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'status',
            ]
        );

        // validate data
        $this->seeJson(
            [
                'status' => 'deleted',
            ]
        );

        // validate data not present in database
        $this->notseeInDatabase('users', $header);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_delete_user_with_invalid_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A']; // invalid wallet address (missing last charecter)

        $this->put("api/v1/user", [], $header);

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
    public function should_not_delete_user_with_non_existing_wallet()
    {
        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A5'; // non-existing wallet address

        $this->delete("api/v1/user", [], ['wallet' => $wallet])
            ->seeStatusCode(404);
    }

}
