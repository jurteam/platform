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
        $this->put("api/v1/user", []);

        // validate status
        $this->seeStatusCode(401);

        // validate stucture of data
        $this->seeJsonStructure(['errors']);

        // validate data
        $this->seeJson(
            [
                'errors' =>
                [
                    'wallet' => ['The wallet is missing.'],
                ],
            ]
        );
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
        $this->post("api/v1/user", ['accepted_disclaimer' => 1, 'accepted_terms' => 1], $header);

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
    public function should_not_update_user_with_non_existing_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A6'];
        $data = ['name' => 'John Nash'];

        // create user
        $this->post("api/v1/user", ['accepted_disclaimer' => 1, 'accepted_terms' => 1], $header)->seeStatusCode(201);

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
        $this->post("api/v1/user", ['accepted_disclaimer' => 1, 'accepted_terms' => 1], $header);

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

    /**
     * @test
     *
     * @return void
     */
    public function should_not_update_user_with_invalid_data()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A1'];

        $data = [
            'name' => 'Bob',
            'email' => 'bob', // invalid email
            'gender' => 'feale', // invalid gender (accept only male,femail and other)
            'location' => 'New York',
            'birth_date' => '1989-30-08', // invalid date
            'category' => 'General',
            'show_fullname' => 'yes', // invalid data type
            'accepted_terms' => 'no', // invalid data type
            'accepted_disclaimer' => 'no', // invalid data type
        ];

        // create user
        $this->post("api/v1/user", ['accepted_disclaimer' => 1, 'accepted_terms' => 1], $header);

        // validate status
        $this->seeStatusCode(201);

        // update user with data
        $this->put("api/v1/user", $data, $header);

        // validate status
        $this->seeStatusCode(422);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'errors' =>
                [
                    'email',
                    'gender',
                    'birth_date',
                    'show_fullname',
                    'accepted_terms',
                    'accepted_disclaimer',
                ],
            ]
        );

        // validate data
        $this->seeJson(
            [
                'errors' =>
                [
                    'email' => ['Email is not valid'],
                    'gender' => ['Gender is not valid'],
                    'birth_date' => ['Birth Date is an invalid date'],
                    'show_fullname' => ['Show Fullname is not valid'],
                    'accepted_terms' => ['Accepted Terms is not valid'],
                    'accepted_disclaimer' => ['Accepted Disclaimer is not valid'],
                ],
            ]
        );

        // validate data not present in database
        $this->notSeeInDatabase('users', $header);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_update_user_without_unique_name()
    {

        $header1 = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A2'];
        $header2 = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A3'];

        // create user1
        $this->post("api/v1/user", ['name' => 'Ashly', 'accepted_disclaimer' => 1, 'accepted_terms' => 1], $header1)
            ->seeStatusCode(201);

        // create user2
        $this->post("api/v1/user", ['name' => 'Johny', 'accepted_disclaimer' => 1, 'accepted_terms' => 1], $header2)
            ->seeStatusCode(201);

        // name should be unique for update
        $this->put("api/v1/user", ['name' => 'Ashly'], $header2)
            ->seeStatusCode(422);
    }
}
