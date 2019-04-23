<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class DisputesEndpointTest extends TestCase
{
    /**
     * @test
     *
     * @return void
     */
    public function a_not_readed_activities_can_be_set_as_readed()
    {
        $this->put("api/v1/activities/readed", [
            'ids' => [1,2,3]
        ]);

        $this->seeInDatabase('activities', [
            'id' => 1,
            'readed' => 1
        ]);
    }
}
