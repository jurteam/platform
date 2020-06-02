<?php

use App\Jobs\GenerateOathKeeperAnalytics;
use App\Jobs\GenerateOathKeeperRank;
use Laravel\Lumen\Testing\DatabaseTransactions;
use \App\Models\OathKeeper;
use \App\Models\Oath;
use \Carbon\Carbon;

class OathKeeperOathTakersTest extends TestCase
{
    use DatabaseTransactions;


    /**
     * @test
     *
     * @return void
     */
    public function should_take_default_duration_to_last_month_when_there_is_no_param()
    {
        // Get the data
        $this->get('api/v1/oath-keeper/oath-takers');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        $rank=1;

        // Validate data
        foreach ($obj->data as $data) {

            $this->assertEquals(
                'oath-takers', $data->type
            );

            $this->assertEquals(
                true,isset ( $data->attributes->address)
            );

            $this->assertEquals(
                $rank++, $data->attributes->rank
            );

            $this->assertEquals(
                14500, $data->attributes->amount
            );

            $this->assertEquals(
                13, $data->attributes->oathCount
            );
        }

        // validate meta data

        $this->assertEquals(
            2, $obj->meta->pagination->total
        );

        $this->assertEquals(
            2, $obj->meta->pagination->count
        );

        $this->assertEquals(
            10, $obj->meta->pagination->per_page
        );

        $this->assertEquals(
            1, $obj->meta->pagination->current_page
        );
        
        $this->assertEquals(
            1, $obj->meta->pagination->total_pages
        );
    }
}
