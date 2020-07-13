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
                'url' => 'http://jur/api/v1/polling/advocate'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x79481d8933832e63be499beaddcd49ac9a809fef',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateStateUpdated',
                'consumer_name' => 'Advocate',
                'url' => 'http://jur/api/v1/polling/advocate'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x79481d8933832e63be499beaddcd49ac9a809fef',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateTypeUpdated',
                'consumer_name' => 'Advocate',
                'url' => 'http://jur/api/v1/polling/advocate'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a',
                'asset_name' => 'jurRewards',
                'event_name' => 'RoleContractUpdated',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a',
                'asset_name' => 'jurRewards',
                'event_name' => 'ActivityCreated',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a',
                'asset_name' => 'jurRewards',
                'event_name' => 'SlotAssigned',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a',
                'asset_name' => 'jurRewards',
                'event_name' => 'ActivityUpdated',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a',
                'asset_name' => 'jurRewards',
                'event_name' => 'SlotUpdated',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a',
                'asset_name' => 'jurRewards',
                'event_name' => 'SlotRewarded',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);
        }
    }
}
