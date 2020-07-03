<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use \App\Jobs\OathKeeperGenerateAnalytics;
use \App\Jobs\OathKeeperGenerateRank;
use \App\Jobs\OathKeeperUpdateFiatValue;
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
     * Consume polling Service to store the data and calculate summaries
     *
     * @param Object $payload: payload data send by Polling Server (Producer)
     * @return Boolean the success or failure message
     */
    public static function consumePollingService($payload)
    {
        $saved = false;

        $oathKeeper;

        switch ($payload->event_name) {

            // oathTaken event
            case 'OathTaken':

                // Create an OathKeper if not exists
                $oathKeeper = OathKeeper::firstOrCreate(['wallet' => $payload->data->_beneficiary]);

                // Set rank to last if new oath-keeper
                if (!isset($oathKeeper->rank)) {
                    $rank = OathKeeper::max('rank');
                    $oathKeeper->rank = isset($rank) ? $rank + 1 : 0;
                    $oathKeeper->save();
                }

                // Save oath to database
                $oath = Oath::store($payload->data, $oathKeeper);

                if (isset($oath->id)) {

                    // Get fiat value of current oath and Generate Rank
                    dispatch((new OathKeeperUpdateFiatValue($oath))->chain([new OathKeeperGenerateRank($oathKeeper)]));

                    // Get the current time
                    $completeAt = Carbon::createFromTimestamp($payload->data->_releaseAt);

                    // find delay
                    $delay = $completeAt->diffInSeconds(Carbon::now());

                    // get job & dispatch
                    $job = (new OathKeeperUpdateOathStateToComplete($payload->data->_beneficiary, $payload->data->_oathIndex))->delay($delay);

                    dispatch($job);

                    // Set status to true
                    $saved = true;
                }

                break;

            // IHoldYourOathFulfilled event
            case 'IHoldYourOathFulfilled':

                // Find oath-keeper based on wallet address and oath-index
                $oathKeeper = OathKeeper::where('wallet', $payload->data->_beneficiary)
                    ->first();

                // Check the oath-keeper exists
                if ($oathKeeper) {
                    $saved = Oath::withrawn($payload); // Changes Oath status
                }

                break;
        }

        // Check the oath-keeper exists for processing
        if (isset($oathKeeper)) {
            OathKeeper::processSummaries($oathKeeper); // Calculate summaries & analytics
        }

        // Return process status
        return $saved;
    }

    /**
     * Calculate oath-keeper summary and dispatch job for analytics
     *
     * @param Object $oathKeeper: oathkeeper object
     */
    private static function processSummaries($oathKeeper)
    {
        // Calculate oath-keeper summary
        OathKeeper::calculateSummary($oathKeeper);

        // Dispatch queue to generate analytics
        dispatch(new OathKeeperGenerateAnalytics);
    }
}
