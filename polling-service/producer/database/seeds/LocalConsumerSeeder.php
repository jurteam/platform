<?php

use Illuminate\Database\Seeder;

class LocalConsumerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        {
            DB::table('consumers')->insert([
                'contract_address' => '0x79481d8933832e63be499beaddcd49ac9a809fef',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateAdded',
                'consumer_name' => 'Advocate',
                'url' => 'http://172.18.0.8/api/v1/polling/advocate'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x79481d8933832e63be499beaddcd49ac9a809fef',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateStateUpdated',
                'consumer_name' => 'Advocate',
                'url' => 'http://172.18.0.8/api/v1/polling/advocate'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x79481d8933832e63be499beaddcd49ac9a809fef',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateTypeUpdated',
                'consumer_name' => 'Advocate',
                'url' => 'http://172.18.0.8/api/v1/polling/advocate'
            ]);
        }
    }
}
