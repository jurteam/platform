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

}
