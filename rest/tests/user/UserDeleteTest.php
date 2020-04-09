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
        $this->delete("api/v1/user", []);

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

    /**
     * @test
     *
     * @return void
     */
    public function should_delete_user_with_data()
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
        $this->post("api/v1/user", $data, $header);

        // validate status
        $this->seeStatusCode(201);

        // validate data present in database
        $this->seeInDatabase('users', array_merge($data, $header));

        // update user with data
        $this->delete("api/v1/user", $data, $header);

        // validate status
        $this->seeStatusCode(200);

        // validate stucture of data
        $this->seeJsonStructure(['status']);

        // validate data
        $this->seeJson(['status' => 'deleted']);

        // validate data present in database
        $this->notSeeInDatabase('users', array_merge($data, $header));
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_not_delete_user_using_name()
    {
        $header = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A1'];

        $data = [
            'name' => 'Bob',
        ];

        // create user
        $this->post("api/v1/user", $data, $header);

        // validate status
        $this->seeStatusCode(201);

        // validate data present in database
        $this->seeInDatabase('users', array_merge($data, $header));

        // delete user using unique name
        $this->delete("api/v1/user", [], $data);

        // validate status
        $this->seeStatusCode(200);

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

        // validate data still present in database
        $this->seeInDatabase('users', array_merge($data, $header));
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_delete_user_and_create_with_same_name()
    {

        $header1 = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A2'];
        $header2 = ['wallet' => '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A3'];

        // create user1
        $this->post("api/v1/user", ['name' => 'Ashly'], $header1)
            ->seeStatusCode(201);

        // delete user1
        $this->delete("api/v1/user", [], $header1)
            ->seeStatusCode(200);

        // validate data deleted from database
        $this->notSeeInDatabase('users', $header1);

        // create user2
        $this->post("api/v1/user", ['name' => 'Ashly'], $header2)
            ->seeStatusCode(201);

        // validate data present in database
        $this->seeInDatabase('users', array_merge(['name' => 'Ashly'], $header2));

    }
}
