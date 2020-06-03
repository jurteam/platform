<?php

use Laravel\Lumen\Testing\DatabaseTransactions;
use \App\Models\Oath;
use \Carbon\Carbon;

class OathKeeperAverageAmountTest extends TestCase
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

            $wallets = array_unique(array_column($activeOathsOnDate, 'wallet'));

            $avg=0;
            if($sum>0) {
                $avg=$sum/sizeof($wallets);
            }

            // Push to graph array with date and sum amount
            array_push($graph, [$date->format('Y-m-d'), $avg]);
        }

        // Get the data
        $this->get('api/v1/oath-keeper/analytics/average-amount?duration='.$durationString);

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
        $this->get('api/v1/oath-keeper/analytics/average-amount');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

         // Check expected value
         $this->assertEquals(
            3000, $obj->data->attributes->value
        );

        // Check expected delta
        $this->assertEquals(
            1500, $obj->data->attributes->delta
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
        $this->get('api/v1/oath-keeper/analytics/average-amount?duration=Last Month');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected value
        $this->assertEquals(
            3000, $obj->data->attributes->value
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
        $this->get('api/v1/oath-keeper/analytics/average-amount?duration=6 Months');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected value
        $this->assertEquals(
            7500, $obj->data->attributes->value
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
        $this->get('api/v1/oath-keeper/analytics/average-amount?duration=Year');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected value
        $this->assertEquals(
            10500, $obj->data->attributes->value
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
        $this->get('api/v1/oath-keeper/analytics/average-amount?duration=Last Month');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected delta
        $this->assertEquals(
            1500, $obj->data->attributes->delta
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
        $this->get('api/v1/oath-keeper/analytics/average-amount?duration=6 Months');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected delta
        $this->assertEquals(
            4500, $obj->data->attributes->delta
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
        $this->get('api/v1/oath-keeper/analytics/average-amount?duration=Year');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected delta
        $this->assertEquals(
            6500, $obj->data->attributes->delta
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
