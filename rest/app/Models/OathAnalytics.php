<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \App\Models\Oath;
use \Carbon\Carbon;

class OathAnalytics extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'card',
        'duration'
    ];

    /**
     * @var array
     */
    protected $casts = [
        'graph' => 'array'
    ];

    /**
     * Process & Store analytics
     *
     * @return Boolean Success or failure status
     */
    public static function processAnalytics()
    {
        $durations = ['Last Month', '6 Months', 'Year'];
        // Process & store nalytics data based on all available durations
        foreach ($durations as $duration) {

            // Find From number of days using $duration
            $days = OathAnalytics::convertDurationToDays($duration);

            // Find fromDate of current durtion
            $currentFromDate = Carbon::now()->subDays($days);

            // Find fromDate of previous durtion
            $previousFromDate = Carbon::now()->subDays($days * 2);

            // Store Amount By Oath Keeper
            OathAnalytics::storeAmountByOathKeeper($duration, $currentFromDate, $previousFromDate);

            // Store Number of Active Oath Keepers
            OathAnalytics::storeActiveOathKeepers($duration, $currentFromDate, $previousFromDate);

            // Store Active Amount
            OathAnalytics::storeActiveAmount($duration, $currentFromDate, $previousFromDate);

            // Store Average Amount
            OathAnalytics::storeAverageAmount($duration, $currentFromDate, $previousFromDate);

        }

    }

    /**
     * Store average amount with graph data
     *
     * @param String $duration: duration string [Month, 6 Months, Year]
     * @param Date $currentFromDate: from date of current duration
     * @param Date $previousFromDate: from date of previous duration
     */
    public static function storeAverageAmount($duration, $currentFromDate, $previousFromDate)
    {
        // Get all active amount in the duration
        $currentValues = Oath::whereNotIn('id', Oath::where('start_at', '>', Carbon::now())
                ->orWhere('release_at', '<', $currentFromDate)->pluck('id'))
            ->select('wallet', 'amount', 'start_at', 'release_at')
            ->get()->toArray();

        $graph = [];

        for ($date = $currentFromDate->copy()->startOfDay(); $date <= Carbon::now()->endOfDay(); $date->addDays(1)) {

            // Filter the array based on active oaths on the date
            $activeOathsOnDate = array_filter($currentValues, function ($x) use ($date) {
                return !(Carbon::createFromDate($x['start_at']) > $date->copy()->endOfDay()
                    || Carbon::createFromDate($x['release_at']) < $date->copy()->startOfDay());
            });

            // Get sum of active amount on the date
            $sum = array_sum(array_column($activeOathsOnDate, 'amount'));

            // Get number of unique wallets on the date
            $count = count(array_unique(array_column($activeOathsOnDate, 'wallet')));

            // Push to graph array with date and average amount
            array_push($graph, [$date->format('Y-m-d'), $sum == 0 ? 0 : $sum / $count]);
        }

        // Get each active wallets and its active amount of previous duration
        $previousValues = Oath::whereNotIn('id', Oath::where('start_at', '>', $currentFromDate)
                ->orWhere('release_at', '<', $previousFromDate)->pluck('id'))
            ->select('wallet', 'amount')
            ->get()->toArray();

        // Get total active amount staked on the current duration
        $currentSum = array_sum(array_column($currentValues, 'amount'));

        // Get total active amount staked on the current duration
        $currentCount = count(array_unique(array_column($currentValues, 'wallet')));

        // Find the average amount of the current duration
        $currentTotal = $currentSum == 0 ? 0 : $currentSum / $currentCount;

        // Get total active amount staked on the previous duration
        $previousSum = array_sum(array_column($previousValues, 'amount'));

        // Get total active amount staked on the previous duration
        $previousCount = count(array_unique(array_column($previousValues, 'wallet')));

        // Find the average amount of the previous duration
        $previousTotal = $previousSum == 0 ? 0 : $previousSum / $previousCount;

        // Find Delta
        $delta = $currentTotal - $previousTotal;

        // Create new OathAnalytics if not exist
        $oathAnalytics = OathAnalytics::firstOrCreate([
            'card' => 'average-amount',
            'duration' => $duration
        ]);

        // Assing details to oathAnalytics object
        $oathAnalytics->value = $currentTotal;
        $oathAnalytics->delta = $delta;
        $oathAnalytics->graph = $graph;

        // Store to database
        $oathAnalytics->save();
    }

    /**
     * Store active amount with graph data
     *
     * @param String $duration: duration string [Month, 6 Months, Year]
     * @param Date $currentFromDate: from date of current duration
     * @param Date $previousFromDate: from date of previous duration
     */
    public static function storeActiveAmount($duration, $currentFromDate, $previousFromDate)
    {
        // Get all active amount in the duration
        $currentValues = Oath::whereNotIn('id', Oath::where('start_at', '>', Carbon::now())
                ->orWhere('release_at', '<', $currentFromDate)->pluck('id'))
            ->select('amount', 'start_at', 'release_at')
            ->get()->toArray();

        $graph = [];

        for ($date = $currentFromDate->copy()->startOfDay(); $date <= Carbon::now()->endOfDay(); $date->addDays(1)) {

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

        // Get each active wallet and its total active amount of previous duration
        $previousTotal = Oath::whereNotIn('id', Oath::where('start_at', '>', $currentFromDate)
                ->orWhere('release_at', '<', $previousFromDate)->pluck('id'))
            ->selectRaw('COALESCE(sum(amount),0) as sum')->pluck('sum')->first();

        // Find the number of active oath-keepers
        $currentTotal = Oath::whereNotIn('id', Oath::where('start_at', '>', Carbon::now())
                ->orWhere('release_at', '<', $currentFromDate)->pluck('id'))
            ->selectRaw('COALESCE(sum(amount),0) as sum')->pluck('sum')->first();

        // Find Delta
        $delta = $currentTotal - $previousTotal;

        // Create new OathAnalytics if not exist
        $oathAnalytics = OathAnalytics::firstOrCreate([
            'card' => 'active-amount',
            'duration' => $duration
        ]);

        // Assing details to oathAnalytics object
        $oathAnalytics->value = $currentTotal;
        $oathAnalytics->delta = $delta;
        $oathAnalytics->graph = $graph;

        // Store to database
        $oathAnalytics->save();
    }

    /**
     * Store number of active oath keepers with graph data
     *
     * @param String $duration: duration string [Month, 6 Months, Year]
     * @param Date $currentFromDate: from date of current duration
     * @param Date $previousFromDate: from date of previous duration
     */
    public static function storeActiveOathKeepers($duration, $currentFromDate, $previousFromDate)
    {
        // Get all active oaths in the duration
        $currentValues = Oath::whereNotIn('id', Oath::where('start_at', '>', Carbon::now())
                ->orWhere('release_at', '<', $currentFromDate)->pluck('id'))
            ->select('wallet', 'start_at', 'release_at')
            ->get()->toArray();

        $graph = [];

        for ($date = $currentFromDate->copy()->startOfDay(); $date <= Carbon::now()->endOfDay(); $date->addDays(1)) {

            // Filter the array based on active oaths on the date
            $activeOathsOnDate = array_filter($currentValues, function ($x) use ($date) {
                return !(Carbon::createFromDate($x['start_at']) > $date->copy()->endOfDay()
                    || Carbon::createFromDate($x['release_at']) < $date->copy()->startOfDay());
            });

            // Get number of unique wallets
            $count = count(array_unique(array_column($activeOathsOnDate, 'wallet')));

            // Push to graph array with date and count
            array_push($graph, [$date->format('Y-m-d'), $count]);
        }

        // Get number of active oath-keepers of previous duration
        $previousTotal = Oath::whereNotIn('id', Oath::where('start_at', '>', $currentFromDate)
                ->orWhere('release_at', '<', $previousFromDate)->pluck('id'))
            ->select('wallet')
            ->distinct('wallet')
            ->count('wallet');

        // Find the number of active oath-keepers of current duration
        $currentTotal = count(array_unique(array_column($currentValues, 'wallet')));

        // Find Delta
        $delta = $currentTotal - $previousTotal;

        // Create new OathAnalytics if not exist
        $oathAnalytics = OathAnalytics::firstOrCreate([
            'card' => 'active-oath-keeper',
            'duration' => $duration
        ]);

        // Assing details to oathAnalytics object
        $oathAnalytics->value = $currentTotal;
        $oathAnalytics->delta = $delta;
        $oathAnalytics->graph = $graph;

        // Store to database
        $oathAnalytics->save();
    }

    /**
     * Store active amount by oath keeper with graph data
     *
     * @param String $duration: duration string [Month, 6 Months, Year]
     * @param Date $currentFromDate: from date of current duration
     * @param Date $previousFromDate: from date of previous duration
     */
    public static function storeAmountByOathKeeper($duration, $currentFromDate, $previousFromDate)
    {
        // Get each active wallet and its total active amount of current duration
        $currentValues = Oath::whereNotIn('id', Oath::where('start_at', '>', Carbon::now())
                ->orWhere('release_at', '<', $currentFromDate)->pluck('id'))
            ->groupBy('wallet')
            ->selectRaw('COALESCE(sum(amount),0) as sum, wallet')
            ->get('sum', 'wallet')->toArray();

        // Find the biggest oath taker
        $max = 0;
        foreach ($currentValues as $obj) {
            if ($obj['sum'] > $max) {
                $max = $obj['sum'];
            }
        }

        // Create new OathAnalytics if not exist
        $oathAnalytics = OathAnalytics::firstOrCreate([
            'card' => 'amount-by-oath-keeper',
            'duration' => $duration
        ]);

        // Assing details to oathAnalytics object
        $oathAnalytics->value = $max;
        $oathAnalytics->graph = array_map(function ($x) {
            return [$x['wallet'], $x['sum']];
        }, $currentValues);

        // Store to database
        $oathAnalytics->save();
    }

    /**
     * Convert duration string to from & to date object.
     *
     * @param  String $duration: Duration in string
     * @return Object From & To date object
     */
    public static function convertDurationToDays($duration)
    {
        $days = 30; // default is Last Month = Today + 30 days

        switch ($duration) {
            case '6 Months':
                $days = 180; // Today + 180 days
                break;

            case 'Year':
                $days = 365; // Today + 365 days
                break;
        }

        return $days;
    }
}
