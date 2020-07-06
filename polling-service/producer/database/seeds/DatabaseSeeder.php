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
        if (env('APP_ENV') === 'production')
        {
            $this->call('AssetSeeder');
        }

        if (env('APP_ENV') === 'local')
        {
            $this->call('AssetSeeder');
        }
    }
}