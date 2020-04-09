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

}
