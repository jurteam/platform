<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $env = 'Production';

        if (env('APP_ENV') === 'local') {
            $env = 'Local';
        }

        $this->call($env . 'AssetSeeder');
        $this->call($env . 'ConsumerSeeder');
    }
}
