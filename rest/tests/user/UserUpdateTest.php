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

}
