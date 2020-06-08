<?php

use Laravel\Lumen\Testing\DatabaseTransactions;
use \App\Models\Oath;
use \Carbon\Carbon;

class OathKeeperAmountByOathKeeperTest extends TestCase
{
    use DatabaseTransactions;

    private function graphValidate($durationString,$durationDays){
        $graph = [];

        $currentValues = Oath::whereNotIn('id', Oath::where('start_at', '>', Carbon::now())
        ->orWhere('release_at', '<',  Carbon::now()->subDays($durationDays)->startOfDay())->pluck('id'))
        ->groupBy('wallet')
        ->selectRaw('COALESCE(sum(amount),0) as sum, wallet')
        ->get('sum', 'wallet')->toArray();

        foreach ($currentValues as $row) {
            // Push to graph array 
            array_push($graph, [$row['wallet'],$row['sum']]);
        }

        // Get the data
        $this->get('api/v1/oath-keeper/analytics/amount-by-oath-keeper?duration='.$durationString);

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
        $this->get('api/v1/oath-keeper/analytics/amount-by-oath-keeper');

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
            0, $obj->data->attributes->delta
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
        $this->get('api/v1/oath-keeper/analytics/amount-by-oath-keeper?duration=Last Month');

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
        $this->get('api/v1/oath-keeper/analytics/amount-by-oath-keeper?duration=6 Months');

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
        $this->get('api/v1/oath-keeper/analytics/amount-by-oath-keeper?duration=Year');

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
        $this->get('api/v1/oath-keeper/analytics/amount-by-oath-keeper?duration=Last Month');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected delta
        $this->assertEquals(
            0, $obj->data->attributes->delta
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
        $this->get('api/v1/oath-keeper/analytics/amount-by-oath-keeper?duration=6 Months');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected delta
        $this->assertEquals(
            0, $obj->data->attributes->delta
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
        $this->get('api/v1/oath-keeper/analytics/amount-by-oath-keeper?duration=Year');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected delta
        $this->assertEquals(
            0, $obj->data->attributes->delta
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
