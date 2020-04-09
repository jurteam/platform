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

    /**
     * @test
     *
     * @return void
     */
    public function should_not_create_user_with_same_wallet()
    {
        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A8';

        $this->post("api/v1/user", [], ['wallet' => $wallet])
            ->seeStatusCode(201);

        $this->post("api/v1/user", [], ['wallet' => $wallet])
            ->seeStatusCode(422);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_create_user_with_valid_data()
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
            'accepted_terms' => 1,
            'accepted_disclaimer' => 1,
        ];

        $this->post("api/v1/user", $data, $header);

        // validate status
        $this->seeStatusCode(201);

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
