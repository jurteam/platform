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
        'part_a_wallet' => str_random(10),
        'part_b_wallet' => str_random(10),
        'category' => 'IT',
        'kpi' => $faker->paragraph
    ];
});
