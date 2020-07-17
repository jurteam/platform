<?php

use Illuminate\Database\Seeder;
use \Carbon\Carbon;
use \App\Models\OathKeeper;
use App\Jobs\OathKeeperGenerateAnalytics;
use App\Jobs\OathKeeperGenerateRank;

class OathKeeperSeeder extends Seeder
{
    protected static $faker;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        self::$faker = Faker\Factory::create();

        factory(App\Models\OathKeeper::class, 2)->create()->each(function ($oathKeeper) {

            // Oath taken in last 30 days
            $this->createOath($oathKeeper, 1, 3000,
                self::$faker->dateTimeBetween('-30 days', '-15 days'),
                self::$faker->dateTimeBetween('-14 days', '+30 days')
            );

            // Oath taken in last 60 days except last 31 days
            $this->createOath($oathKeeper, 1, 1500,
                self::$faker->dateTimeBetween('-60 days', '-45 days'),
                self::$faker->dateTimeBetween('-44 days', '-31 days')
            );

            // Oath taken in last 6 months except last 61 days
            $this->createOath($oathKeeper, 4, 750,
                self::$faker->dateTimeBetween('-180 days', '-90 days'),
                self::$faker->dateTimeBetween('-89 days', '-61 days')
            );

            // Oath taken in last 1 year except last 6 months
            $this->createOath($oathKeeper, 3, 1000,
                self::$faker->dateTimeBetween('-365 days', '-220 days'),
                self::$faker->dateTimeBetween('-219 days', '-181 days')
            );

            // Oath taken before 1 year
            $this->createOath($oathKeeper, 4, 1000,
                self::$faker->dateTimeBetween('-730 days', '-500 days'),
                self::$faker->dateTimeBetween('-499 days', '-366 days')
            );

            OathKeeper::calculateSummary($oathKeeper);
            $rank = new OathKeeperGenerateRank($oathKeeper);
            $rank->handle();
        });

        $analytics = new OathKeeperGenerateAnalytics;
        $analytics->handle();
    }

    private function createOath($oathKeeper, $count, $amount, $startDate, $releaseDate)
    {
        $now = Carbon::now();

        factory(App\Models\Oath::class, $count)->create([
            'wallet' => $oathKeeper->wallet,
            'oath_keeper_id' => $oathKeeper->id,
            'amount' => $amount,
            'start_at' => $startDate,
            'release_at' => $releaseDate,
            'current_state' => $startDate < $now && $releaseDate > $now ? 'active' : 'complete'
        ]);

    }
}
