<?php

use App\Jobs\GenerateOathKeeperAnalytics;
use App\Jobs\GenerateOathKeeperRank;
use Laravel\Lumen\Testing\DatabaseTransactions;
use \App\Models\OathKeeper;
use \App\Models\Oath;
use \Carbon\Carbon;

class OathKeeperActiveOathKeepersTest extends TestCase
{
    use DatabaseTransactions;

    private function graphValidate($durationString,$durationDays){
        $graph = [];

        $currentValues = Oath::select('wallet', 'start_at', 'release_at')
        ->get()->toArray();

        for ($date = Carbon::now()->subDays($durationDays)->startOfDay(); $date <= Carbon::now()->endOfDay(); $date->addDays(1)) {

            // Filter the array based on active oaths on the date
            $activeOathsOnDate = array_filter($currentValues, function ($x) use ($date) {
                return !(Carbon::createFromDate($x['start_at']) > $date->copy()->endOfDay()
                    || Carbon::createFromDate($x['release_at']) < $date->copy()->startOfDay());
            });

            // Get sum of active wallets on the date
            $wallets = array_unique(array_column($activeOathsOnDate, 'wallet'));

            // Push to graph array with date and number of wallets
            array_push($graph, [$date->format('Y-m-d'), sizeof($wallets)]);
        }

        // Get the data
        $this->get('api/v1/oath-keeper/analytics/active-oath-keeper?duration='.$durationString);

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
        $this->get('api/v1/oath-keeper/analytics/active-oath-keeper');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

         // Check expected value
         $this->assertEquals(
            2, $obj->data->attributes->value
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
        $this->get('api/v1/oath-keeper/analytics/active-oath-keeper?duration=Last Month');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected value
        $this->assertEquals(
            2, $obj->data->attributes->value
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
        $this->get('api/v1/oath-keeper/analytics/active-oath-keeper?duration=6 Months');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected value
        $this->assertEquals(
            2, $obj->data->attributes->value
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
        $this->get('api/v1/oath-keeper/analytics/active-oath-keeper?duration=Year');

        // validate status
        $this->seeStatusCode(200);

        // Convert JSON to object
        $obj = json_decode($this->response->getContent());

        // Check expected value
        $this->assertEquals(
            2, $obj->data->attributes->value
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
        $this->get('api/v1/oath-keeper/analytics/active-oath-keeper?duration=Last Month');

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
        $this->get('api/v1/oath-keeper/analytics/active-oath-keeper?duration=6 Months');

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
        $this->get('api/v1/oath-keeper/analytics/active-oath-keeper?duration=Year');

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
