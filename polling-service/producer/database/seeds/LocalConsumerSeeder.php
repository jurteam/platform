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
<<<<<<< HEAD
                'url' => 'http://jur/api/v1/polling/advocate'
=======
                'url' => 'http://172.18.0.8/api/v1/polling/advocate'
>>>>>>> 83247e79ff1c17cb3690400a270bd5b590031cd2
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x79481d8933832e63be499beaddcd49ac9a809fef',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateStateUpdated',
                'consumer_name' => 'Advocate',
<<<<<<< HEAD
                'url' => 'http://jur/api/v1/polling/advocate'
=======
                'url' => 'http://172.18.0.8/api/v1/polling/advocate'
>>>>>>> 83247e79ff1c17cb3690400a270bd5b590031cd2
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0x79481d8933832e63be499beaddcd49ac9a809fef',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateTypeUpdated',
                'consumer_name' => 'Advocate',
<<<<<<< HEAD
                'url' => 'http://jur/api/v1/polling/advocate'
=======
                'url' => 'http://172.18.0.8/api/v1/polling/advocate'
>>>>>>> 83247e79ff1c17cb3690400a270bd5b590031cd2
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0xe7c2b0d046c56b62D5631aC52FbD5D7cEf319c32',
                'asset_name' => 'jurRewards',
                'event_name' => 'RoleContractUpdated',
                'consumer_name' => 'Reward',
<<<<<<< HEAD
                'url' => 'http://jur/api/v1/polling/reward'
=======
                'url' => 'http://172.18.0.8/api/v1/polling/reward'
>>>>>>> 83247e79ff1c17cb3690400a270bd5b590031cd2
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0xe7c2b0d046c56b62D5631aC52FbD5D7cEf319c32',
                'asset_name' => 'jurRewards',
                'event_name' => 'ActivityCreated',
                'consumer_name' => 'Reward',
<<<<<<< HEAD
                'url' => 'http://jur/api/v1/polling/reward'
=======
                'url' => 'http://172.18.0.8/api/v1/polling/reward'
>>>>>>> 83247e79ff1c17cb3690400a270bd5b590031cd2
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0xe7c2b0d046c56b62D5631aC52FbD5D7cEf319c32',
                'asset_name' => 'jurRewards',
                'event_name' => 'SlotAssigned',
                'consumer_name' => 'Reward',
<<<<<<< HEAD
                'url' => 'http://jur/api/v1/polling/reward'
=======
                'url' => 'http://172.18.0.8/api/v1/polling/reward'
>>>>>>> 83247e79ff1c17cb3690400a270bd5b590031cd2
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0xe7c2b0d046c56b62D5631aC52FbD5D7cEf319c32',
                'asset_name' => 'jurRewards',
                'event_name' => 'ActivityUpdated',
                'consumer_name' => 'Reward',
<<<<<<< HEAD
                'url' => 'http://jur/api/v1/polling/reward'
=======
                'url' => 'http://172.18.0.8/api/v1/polling/reward'
>>>>>>> 83247e79ff1c17cb3690400a270bd5b590031cd2
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0xe7c2b0d046c56b62D5631aC52FbD5D7cEf319c32',
                'asset_name' => 'jurRewards',
                'event_name' => 'SlotUpdated',
                'consumer_name' => 'Reward',
<<<<<<< HEAD
                'url' => 'http://jur/api/v1/polling/reward'
=======
                'url' => 'http://172.18.0.8/api/v1/polling/reward'
>>>>>>> 83247e79ff1c17cb3690400a270bd5b590031cd2
            ]);

            DB::table('consumers')->insert([
                'contract_address' => '0xe7c2b0d046c56b62D5631aC52FbD5D7cEf319c32',
                'asset_name' => 'jurRewards',
                'event_name' => 'SlotRewarded',
                'consumer_name' => 'Reward',
<<<<<<< HEAD
                'url' => 'http://jur/api/v1/polling/reward'
=======
                'url' => 'http://172.18.0.8/api/v1/polling/reward'
>>>>>>> 83247e79ff1c17cb3690400a270bd5b590031cd2
            ]);
        }
    }
}
