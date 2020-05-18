<?php

namespace App\Models;

use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\OathKeeper;

class Oath extends Model
{
    /**
     * @var array
     */
    protected $fillable = [

    ];

    public $timestamps = true;

    /**
     * Create an oath based on $data object
     *
     * @param Object $data: payload data send by AMQP server
     * @param OathKeeper $oathKeeper: Object of the OathKeeper
     * @return Boolean the success or failure message
     */
    public static function store($data, $oathKeeper)
    {
        $oath = new Oath;

        $oath->wallet = $data->_beneficiary;
        $oath->oath_index = $data->_oathIndex;
        $oath->amount = $data->_amount;
        $oath->lock_in_period = $data->_lockInPeriod;
        $oath->start_at = Carbon::createFromTimestamp($data->_startAt);
        $oath->release_at = Carbon::createFromTimestamp($data->_releaseAt);
        $oath->current_state = 'active';
        $oath->oath_keeper_id = $oathKeeper->id;

        return $oath->save();
    }

    /**
     * Upadte an oath to mark oathWithrawn based on $payload object
     *
     * @param Object $payload: payload  send by AMQP server
     * @return Boolean the success or failure message
     */
    public static function withrawn($payload)
    {
        $oath = Oath::where([
            'wallet' => $payload->data->_beneficiary,
            'oath_index' => $payload->data->_oathIndex
        ])->first();

        $oath->withdrawn_at = Carbon::createFromTimestamp($payload->transaction->meta->blockTimestamp);
        $oath->current_state = 'withdrawn';

        return $oath->save();
    }

    /**
     * Get average amount card between two dates
     *
     * @param Date $from: from date
     * @param Date $to: to date
     * @return Array $GeneartedCard: card details
     */
    public static function averageAmount($from, $to)
    {
        $sum = Oath::whereNotIn('id', Oath::where('start_at', '>', $to)
                ->orWhere('release_at', '<', $from)->pluck('id'))
            ->sum('amount');

        $count = Oath::whereNotIn('id', Oath::where('start_at', '>', $to)
                ->orWhere('release_at', '<', $from)->pluck('id'))
            ->select('wallet')
            ->distinct('wallet')
            ->count('wallet');

        $diff = date_diff($from, $to);
        $faker = Factory::create();

        return [
            'value' => $sum == 0 ? 0 : $sum / $count,
            'delta' => $faker->numberBetween(-100, 100),
            'graph' => Oath::generateGraphArray($diff->format("%a"))
        ];
    }

    /**
     * Get active amount card between two dates
     *
     * @param Date $from: from date
     * @param Date $to: to date
     * @return Array $GeneartedCard: card details
     */
    public static function activeAmount($from, $to)
    {
        $data = Oath::whereNotIn('id', Oath::where('start_at', '>', $to)
                ->orWhere('release_at', '<', $from)->pluck('id'))
            ->pluck('amount', 'id');

        $diff = date_diff($from, $to);
        $faker = Factory::create();

        return [
            'value' => $data,
            'delta' => $faker->numberBetween(-100, 100),
            'graph' => Oath::generateGraphArray($diff->format("%a"))
        ];
    }

    /**
     * Get active amount by oath keeper card between two dates
     *
     * @param Date $from: from date
     * @param Date $to: to date
     * @return Array $GeneartedCard: card details
     */
    public static function amountByOathKeeper($from, $to)
    {
        $data = Oath::whereNotIn('id', Oath::where('start_at', '>', $to)
                ->orWhere('release_at', '<', $from)->pluck('id'))
            ->groupBy('wallet')
            ->selectRaw('sum(amount) as sum, wallet')
            ->get('sum', 'wallet');

        $diff = date_diff($from, $to);
        $faker = Factory::create();

        $max = 0;
        foreach ($data as $obj) {
            if ($obj->sum > $max) {
                $max = $obj->sum;
            }
        }

        return [
            'value' => $max,
            'graph' => Oath::generateGraphArray($diff->format("%a"))
        ];
    }

    /**
     * Get number of active oath keepers card between two dates
     *
     * @param Date $from: from date
     * @param Date $to: to date
     * @return Array $GeneartedCard: card details
     */
    public static function activeOathKeepers($from, $to)
    {

        $data = Oath::whereNotIn('id', Oath::where('start_at', '>', $to)
                ->orWhere('release_at', '<', $from)->pluck('id'))
            ->select('wallet')
            ->distinct('wallet')
            ->count('wallet');

        $diff = date_diff($from, $to);
        $faker = Factory::create();

        return [
            'value' => $data,
            'delta' => $faker->numberBetween(-100, 100),
            'graph' => Oath::generateGraphArray($diff->format("%a"))
        ];

    }

    /**
     * Generate graph details of a card based on duration.
     *
     * @param  String $duration: duration in number of days
     * @return Array $GeneartedGraph: graph array
     */
    public static function generateGraphArray($days)
    {
        $faker = Factory::create();
        // two dimentional graph array : [index, value]
        $graph = [];

        // generate graph based on number days
        for ($i = 0; $i <= $days; $i++) {
            array_push($graph, [$i, $faker->numberBetween(0, 9999999)]); // add [index,value] to $graph variable
        }

        return $graph;
    }

}
