<?php

use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\User::class, 20)->create([
            'wallet' => 'QHx5VJEg3zO2jseSEq8R/wtCljguCvHSMA49HQ1IWiI='
        ]);
    }
}
