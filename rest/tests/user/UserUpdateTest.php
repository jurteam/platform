<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class UserUpdateTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_update_user_without_wallet()
    {
        $this->put("api/v1/user", [])
            ->seeStatusCode(401);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_update_user_name_using_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7'];
        $data = ['name' => 'John Nash'];

        // create user
        $this->post("api/v1/user", [], $header);

        // validate status of create
        $this->seeStatusCode(201);

        // update existing user's name
        $this->put("api/v1/user", $data, $header);

        // validate status of update
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'user' =>
                [
                    'id',
                    'name',
                    'wallet',
                    'updated_at',
                    'created_at',
                ],
            ]
        );

        // validate data present in database
        $this->seeInDatabase('users', array_merge($data, $header));
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_update_user_with_invalid_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A']; // invalid wallet address (missing last charecter)

        $this->put("api/v1/user", [], $header);

        // validate status
        $this->seeStatusCode(422);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_update_user_with_non_existing_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A6'];
        $data = ['name' => 'John Nash'];

        // create user
        $this->post("api/v1/user", [], $header)->seeStatusCode(201);

        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A5'; // non-existing wallet address

        $this->put("api/v1/user", [], ['wallet' => $wallet])
            ->seeStatusCode(404);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_update_user_with_valid_data()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616AA'];

        $data = [
            'name' => 'Alice',
            'email' => 'alice007@gmail.com',
            'gender' => 'female',
            'location' => 'New York',
            'birth_date' => '1989-10-08',
            'category' => 'General',
            'show_fullname' => 1,
        ];

        // create user
        $this->post("api/v1/user", [], $header);

        // validate status
        $this->seeStatusCode(201);

        // update user with data
        $this->put("api/v1/user", $data, $header);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'user' =>
                [
                    'id',
                    'wallet',
                    'name',
                    'email',
                    'gender',
                    'location',
                    'birth_date',
                    'category',
                    'show_fullname',
                    'accepted_terms',
                    'accepted_disclaimer',
                    'updated_at',
                    'created_at',
                ],
            ]

        );

        // validate data present in database
        $this->seeInDatabase('users', array_merge($data, $header));
    }

}
