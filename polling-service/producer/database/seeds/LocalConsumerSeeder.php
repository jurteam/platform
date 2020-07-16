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
                'contract_address' => '0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateAdded',
                'consumer_name' => 'Advocate',
                'url' => 'http://jur/api/v1/polling/advocate'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateStateUpdated',
                'consumer_name' => 'Advocate',
                'url' => 'http://jur/api/v1/polling/advocate'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x65F2BCA97cAf8429cBB34e6146197FA12cDDE417',
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

            DB::table('consumers')->insert([
                'contract_address' => '0x26e82BEe7d1369c2969f7Fb9C33fB10926708850',
                'asset_name' => 'jurStatus',
                'event_name' => 'StatusAdded',
                'consumer_name' => 'Status',
                'url' => 'http://jur/api/v1/polling/status'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x26e82BEe7d1369c2969f7Fb9C33fB10926708850',
                'asset_name' => 'jurStatus',
                'event_name' => 'StateChanged',
                'consumer_name' => 'Status',
                'url' => 'http://jur/api/v1/polling/status'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x26e82BEe7d1369c2969f7Fb9C33fB10926708850',
                'asset_name' => 'jurStatus',
                'event_name' => 'StatusTypeChanged',
                'consumer_name' => 'Status',
                'url' => 'http://jur/api/v1/polling/status'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0xD689Db4A731cbb216E81C2F6096c583e329A9B48',
                'asset_name' => 'oathKeeper',
                'event_name' => 'OathTaken',
                'consumer_name' => 'OathKeeper',
                'url' => 'http://jur/api/v1/polling/oath-keeper'
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0xD689Db4A731cbb216E81C2F6096c583e329A9B48',
                'asset_name' => 'oathKeeper',
                'event_name' => 'IHoldYourOathFulfilled',
                'consumer_name' => 'OathKeeper',
                'url' => 'http://jur/api/v1/polling/oath-keeper'
            ]);
        }
    }
}
