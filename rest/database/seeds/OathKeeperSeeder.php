<?php

use Illuminate\Database\Seeder;

class OathKeeperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\OathKeeper::class, 20)->create()->each(function ($oathKeeper) {

            factory(App\Models\Oath::class, rand(1, 15))->create([
                'wallet' => $oathKeeper->wallet,
                'oath_keeper_id' => $oathKeeper->id
            ]);
        });

        $oathKeepers = App\Models\OathKeeper::all();

        foreach ($oathKeepers as $oathKeeper) {

            $total_amount = 0;
            $total_oath_count = 0;
            $active_amount = 0;
            $active_oath_count = 0;

            $oaths = App\Models\Oath::where('oath_keeper_id', $oathKeeper->id)->get();

            foreach ($oaths as $oath) {
                $total_amount = $total_amount + $oath->amount;
                $total_oath_count = $total_oath_count + 1;
                if ($oath->current_state == 'active') {
                    $active_amount = $active_amount + $oath->amount;
                    $active_oath_count = $active_oath_count + 1;
                }
            }

            $oathKeeper->total_amount = $total_amount;
            $oathKeeper->active_amount = $active_amount;
            $oathKeeper->active_oath_count = $active_oath_count;
            $oathKeeper->total_oath_count = $total_oath_count;
            $oathKeeper->save();

        }

        $oathKeepers = App\Models\OathKeeper::orderBy('active_amount', 'desc')->get();
        $rank = 0;
        foreach ($oathKeepers as $oathKeeper) {
            $oathKeeper->rank = ++$rank;
            $oathKeeper->save();
        }
    }
}
