<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class UserReadTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_not_read_user_without_wallet()
    {
        $this->get("api/v1/user", []);

        // validate status
        $this->seeStatusCode(401);

        // validate stucture of data
        $this->seeJsonStructure(['errors']);

        // validate response
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
    public function should_not_read_user_with_invalid_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A']; // invalid wallet address (missing last charecter)

        $this->get("api/v1/user", $header);

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
    public function should_not_read_user_with_non_existing_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A6'];
        $data = ['name' => 'John Nash'];

        // create user
        $this->post("api/v1/user", ['accepted_disclaimer' => 1, 'accepted_terms' => 1], $header)->seeStatusCode(201);

        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A5'; // non-existing wallet address

        $this->get("api/v1/user", [], ['wallet' => $wallet])
            ->seeStatusCode(404);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_read_user_with_all_data()
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
            'accepted_disclaimer' => 1,
            'accepted_terms' => 1,
        ];

        // create user
        $this->post("api/v1/user", $data, $header);

        // validate status
        $this->seeStatusCode(201);

        // read user with data
        $this->get("api/v1/user", $header);

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
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_read_user_registration_status_without_wallet()
    {
        // check user registration status
        $this->get("api/v1/user/checking", []);

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
    public function should_read_user_registration_status_with_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616AE'];

        // check user registration status
        $this->get("api/v1/user/checking", $header);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(['status', 'user']);

        // validate data
        $this->seeJson(
            [
                'status' => 'false',
                'user' => [],
            ]
        );

        // create the user
        $this->post("api/v1/user", ['accepted_disclaimer' => 1, 'accepted_terms' => 1], $header);

        // validate status
        $this->seeStatusCode(201);

        // check user registration status
        $this->get("api/v1/user/checking", $header);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(['status', 'user']);

        // validate data
        $this->seeJson(
            [
                'status' => 'true',
                'user' => [
                    'id',
                    'wallet',
                    'accepted_terms',
                    'accepted_disclaimer',
                    'updated_at',
                    'created_at',
                ],
            ]
        );
    }
}
