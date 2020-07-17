<?php

use Laravel\Lumen\Testing\DatabaseTransactions;
use \App\Models\Oath;
use \Carbon\Carbon;

class OathKeeperActiveAmountTest extends TestCase
{
    use DatabaseTransactions;

    private function graphValidate($durationString,$durationDays){
        $graph = [];

        $currentValues = Oath::select('wallet','amount', 'start_at', 'release_at')
        ->get()->toArray();

        for ($date = Carbon::now()->subDays($durationDays)->startOfDay(); $date <= Carbon::now()->endOfDay(); $date->addDays(1)) {

            // Filter the array based on active oaths on the date
            $activeOathsOnDate = array_filter($currentValues, function ($x) use ($date) {
                return !(Carbon::createFromDate($x['start_at']) > $date->copy()->endOfDay()
                    || Carbon::createFromDate($x['release_at']) < $date->copy()->startOfDay());
            });

            // Get sum of active amount on the date
            $sum = array_sum(array_column($activeOathsOnDate, 'amount'));

            // Push to graph array with date and sum amount
            array_push($graph, [$date->format('Y-m-d'), $sum]);
        }

        // Get the data
        $this->get('api/v1/oath-keeper/analytics/active-amount?duration='.$durationString);

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected value
        $this->assertEquals(
            $graph, $obj->data->attributes->graph
        );
    }

     /**
     * @test
     *
     * @return void
     */
    public function should_take_default_duration_to_last_month_when_there_is_no_param()
    {
        // Get the data
        $this->get('api/v1/oath-keeper/analytics/active-amount');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

         // Check expected value
         $this->assertEquals(
            6000, $obj->data->attributes->value
        );

        // Check expected delta
        $this->assertEquals(
            3000, $obj->data->attributes->delta
        );

    }

    /**
     * @test
     *
     * @return void
     */
    public function should_valid_value_of_last_month()
    {

        // Get the data
        $this->get('api/v1/oath-keeper/analytics/active-amount?duration=Last Month');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected value
        $this->assertEquals(
            6000, $obj->data->attributes->value
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_valid_value_of_last_6_months()
    {

        // Get the data
        $this->get('api/v1/oath-keeper/analytics/active-amount?duration=6 Months');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected value
        $this->assertEquals(
            15000, $obj->data->attributes->value
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_valid_value_of_last_year()
    {

        // Get the data
        $this->get('api/v1/oath-keeper/analytics/active-amount?duration=Year');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected value
        $this->assertEquals(
            21000, $obj->data->attributes->value
        );
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_valid_delta_of_last_month()
    {
        // Get the data
        $this->get('api/v1/oath-keeper/analytics/active-amount?duration=Last Month');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected delta
        $this->assertEquals(
            3000, $obj->data->attributes->delta
        );

    }


    /**
     * @test
     *
     * @return void
     */
    public function should_valid_delta_of_last_6_months()
    {
        // Get the data
        $this->get('api/v1/oath-keeper/analytics/active-amount?duration=6 Months');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected delta
        $this->assertEquals(
            9000, $obj->data->attributes->delta
        );

    }


     /**
     * @test
     *
     * @return void
     */
    public function should_valid_delta_of_last_year()
    {
        // Get the data
        $this->get('api/v1/oath-keeper/analytics/active-amount?duration=Year');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected delta
        $this->assertEquals(
            13000, $obj->data->attributes->delta
        );

    }

    /**
     * @test
     *
     * @return void
     */
    public function should_valid_graph_of_last_month()
    {
        $this->graphValidate('Last Month',30);
    }


    /**
     * @test
     *
     * @return void
     */
    public function should_valid_graph_of_last_6_months()
    {
        $this->graphValidate('6 Months',180);
    }

    /**
     * @test
     *
     * @return void
     */
    public function should_valid_graph_of_last_year()
    {
        $this->graphValidate('Year',365);
    }
    
}
