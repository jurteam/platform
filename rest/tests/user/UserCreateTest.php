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
        $this->post("api/v1/user", []);

        // validate status
        $this->seeStatusCode(422);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_create_user_without_accepting_disclaimer_and_terms()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A4'];

        $this->post("api/v1/user", [], $header);

        // validate status
        $this->seeStatusCode(422);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'errors' =>
                [
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
                    'accepted_terms' => ['The accepted terms must be accepted.'],
                    'accepted_disclaimer' => ['The accepted disclaimer must be accepted.'],
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
    public function should_create_user_only_with_wallet()
    {

        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7'];

        $this->post("api/v1/user",
            [
                'accepted_terms' => 1,
                'accepted_disclaimer' => 1,
            ],
            $header
        );

        // validate status
        $this->seeStatusCode(201);

        // validate stucture of data
        $this->seeJsonStructure(
            [
                'user' =>
                [
                    'id',
                    'wallet',
                    'accepted_terms',
                    'accepted_disclaimer',
                    'updated_at',
                    'created_at',
                ],
            ]
        );

        // validate data present in database
        $this->seeInDatabase('users', $header);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_create_user_with_invalid_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A']; // invalid wallet address (missing last charecter)

        $this->post("api/v1/user",
            [
                'accepted_terms' => 1,
                'accepted_disclaimer' => 1,
            ],
            $header
        );

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
    public function should_not_create_user_with_same_wallet()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A8'];

        $this->post("api/v1/user",
            [
                'accepted_terms' => 1,
                'accepted_disclaimer' => 1,
            ],
            $header
        )
            ->seeStatusCode(201);

        $this->post("api/v1/user",
            [
                'accepted_terms' => 1,
                'accepted_disclaimer' => 1,
            ],
            $header
        )
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

    /**
     * @test
     *
     * @return void
     */
    public function should_not_create_user_with_invalid_data()
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

        $this->post("api/v1/user", $data, $header);

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
                    'accepted_terms' => ['The accepted terms must be accepted.', 'Accepted Terms is not valid'],
                    'accepted_disclaimer' => ['The accepted disclaimer must be accepted.', 'Accepted Disclaimer is not valid'],
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
    public function should_not_create_user_without_unique_name()
    {
        // TODO: the name should replaced as username in database

        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A2'];

        $this->post("api/v1/user",
            [
                'name' => 'John Nash',
                'accepted_terms' => 1,
                'accepted_disclaimer' => 1,
            ],
            $header
        )
            ->seeStatusCode(201);

        // check user name is unique
        $this->post("api/v1/user",
            [
                'name' => 'John Nash',
                'accepted_terms' => 1,
                'accepted_disclaimer' => 1,
            ],
            $header
        )
            ->seeStatusCode(422);
    }
}
