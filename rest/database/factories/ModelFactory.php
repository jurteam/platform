<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
 */

$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'birth_date' => $faker->date('Y-m-d', 'now'),
        'gender' => '',
        'location' => '',
        'category' => '',
        'show_fullname' => false,
        'accepted_terms' => true,
        'wallet' => str_random(30)
    ];
});

$factory->define(App\Models\Faq::class, function (Faker\Generator $faker) {
    return [
        'title' => $faker->sentence,
        'description' => $faker->paragraph
    ];
});

$factory->define(App\Models\Contract::class, function (Faker\Generator $faker) {
    return [
        'contract_status_id' => 2,
        'part_a_wallet' => str_random(10),
        'part_b_wallet' => str_random(10),
        'category' => 'IT',
        'kpi' => $faker->paragraph
    ];
});

$factory->define(App\Models\OathKeeper::class, function (Faker\Generator $faker) {
    return [
        'wallet' => '0x' . $faker->sha1,
        'total_amount' => 0
    ];
});

$factory->define(App\Models\Oath::class, function (Faker\Generator $faker) {

    $startDate = \Carbon\Carbon::createFromDate(
        $faker->numberBetween(2018, 2020),
        $faker->numberBetween(1, 4),
        $faker->numberBetween(1, 28)
    );

    $toDate = \Carbon\Carbon::createFromDate(
        $faker->numberBetween(2020, 2022),
        $faker->numberBetween(4, 10),
        $faker->numberBetween(1, 28),
    );

    $now = \Carbon\Carbon::now();

    $diff = date_diff($startDate, $toDate);

    return [
        'amount' => $faker->numberBetween(1, 1000000),
        'lock_in_period' => $diff->format("%a"),
        'oath_index' => $faker->numberBetween(1, 15),
        'start_at' => $startDate->toDateTimeString(),
        'release_at' => $toDate->toDateTimeString(),
        'current_state' => $startDate < $now && $toDate > $now ? 'active' : 'complete'
    ];
});
