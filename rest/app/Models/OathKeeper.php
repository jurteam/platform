<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use \App\Jobs\OathKeeperGenerateAnalytics;
use \App\Jobs\OathKeeperGenerateRank;
use \App\Jobs\OathKeeperUpdateOathStateToComplete;
use \App\Models\Oath;

class OathKeeper extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'wallet'
    ];

    public $timestamps = true;

    public function scopeFilters($query, $filters)
    {
        return $filters->apply($query);
    }

    /**
     * Calculate summary for an oathKeeper
     *
     * @param OathKeeper $oathKeeper: Object of an OathKeeper
     * @return Boolean the success or failure message
     */
    public static function calculateSummary(OathKeeper $oathKeeper)
    {
        $total_amount = 0;
        $active_amount = 0;
        $active_oath_count = 0;
        $total_oath_count = 0;

        // Get all other oaths for the specified wallet
        $rows = Oath::where(['wallet' => $oathKeeper->wallet])
            ->select('amount', 'current_state')
            ->get();

        // Calculate sum of total and active amounts
        foreach ($rows as &$row) {
            if ($row->current_state == 'active') {
                $active_amount = $active_amount + $row->amount;
                $active_oath_count = $active_oath_count + 1;
            }
            $total_amount = $total_amount + $row->amount;
            $total_oath_count = $total_oath_count + 1;
        }

        // Store calculated values
        $oathKeeper->total_amount = $total_amount;
        $oathKeeper->active_amount = $active_amount;
        $oathKeeper->active_oath_count = $active_oath_count;
        $oathKeeper->total_oath_count = $total_oath_count;
        return $oathKeeper->save();
    }

    /**
     * Consume AMQP payload to store the data and calculate summaries
     *
     * @param Object $payload: payload data send by AMQP server
     * @return Boolean the success or failure message
     */
    public static function consumeAMQP($payload)
    {
        $saved = false;

        // Create an OathKeper if not exists
        $oathKeeper = OathKeeper::firstOrCreate(['wallet' => $payload->data->_beneficiary]);

        switch ($payload->eventIdentifier) {

            // oathTaken event
            case 'OathTaken':
                // Save oath to database
                $saved = Oath::store($payload->data, $oathKeeper);

                if ($saved) {

                    // Generate Rank
                    dispatch(new OathKeeperGenerateRank($oathKeeper));

                    // Get the current time
                    $completeAt = Carbon::createFromTimestamp($payload->data->_releaseAt);

                    // find delay
                    $delay = $completeAt->diffInSeconds(Carbon::now());

                    // get job & dispatch
                    $job = (new OathKeeperUpdateOathStateToComplete($payload->data->_beneficiary, $payload->data->_oathIndex))->delay($delay);

                    dispatch($job);
                }

                break;

            // IHoldYourOathFulfilled event
            case 'IHoldYourOathFulfilled':
                // Change Oath status
                $saved = Oath::withrawn($payload);
                break;
        }

        // Return false if not saved
        if (!$saved) {
            return false;
        }

        $saved = OathKeeper::calculateSummary($oathKeeper);

        // Dispatch queue to generate analytics if all success
        if ($saved) {
            dispatch(new OathKeeperGenerateAnalytics);
        }

        // Return process status
        return $saved;
    }

}
