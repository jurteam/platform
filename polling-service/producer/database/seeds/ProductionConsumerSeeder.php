<?php

use App\Models\Consumer;
use Illuminate\Database\Seeder;

class ProductionConsumerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        {
            Consumer::firstOrCreate([
                'contract_address' => '0x65f2bca97caf8429cbb34e6146197fa12cdde417',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateAdded',
                'consumer_name' => 'Advocate',
                'url' => 'http://jur/api/v1/polling/advocate'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x65f2bca97caf8429cbb34e6146197fa12cdde417',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateStateUpdated',
                'consumer_name' => 'Advocate',
                'url' => 'http://jur/api/v1/polling/advocate'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x65f2bca97caf8429cbb34e6146197fa12cdde417',
                'asset_name' => 'jurAdvocate',
                'event_name' => 'AdvocateTypeUpdated',
                'consumer_name' => 'Advocate',
                'url' => 'http://jur/api/v1/polling/advocate'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x517952463df7c7c951faA7cA914d4Ef56DB99498',
                'asset_name' => 'jurRewards',
                'event_name' => 'RoleContractUpdated',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x517952463df7c7c951faA7cA914d4Ef56DB99498',
                'asset_name' => 'jurRewards',
                'event_name' => 'ActivityCreated',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x517952463df7c7c951faA7cA914d4Ef56DB99498',
                'asset_name' => 'jurRewards',
                'event_name' => 'SlotAssigned',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x517952463df7c7c951faA7cA914d4Ef56DB99498',
                'asset_name' => 'jurRewards',
                'event_name' => 'ActivityUpdated',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x517952463df7c7c951faA7cA914d4Ef56DB99498',
                'asset_name' => 'jurRewards',
                'event_name' => 'SlotUpdated',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x517952463df7c7c951faA7cA914d4Ef56DB99498',
                'asset_name' => 'jurRewards',
                'event_name' => 'SlotRewarded',
                'consumer_name' => 'Reward',
                'url' => 'http://jur/api/v1/polling/reward'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x26e82bee7d1369c2969f7fb9c33fb10926708850',
                'asset_name' => 'jurStatus',
                'event_name' => 'StatusAdded',
                'consumer_name' => 'Status',
                'url' => 'http://jur/api/v1/polling/status'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x26e82bee7d1369c2969f7fb9c33fb10926708850',
                'asset_name' => 'jurStatus',
                'event_name' => 'StateChanged',
                'consumer_name' => 'Status',
                'url' => 'http://jur/api/v1/polling/status'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x26e82bee7d1369c2969f7fb9c33fb10926708850',
                'asset_name' => 'jurStatus',
                'event_name' => 'StatusTypeChanged',
                'consumer_name' => 'Status',
                'url' => 'http://jur/api/v1/polling/status'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x8a4C0Ff5C39E0eF5cfbe72a57603b11af3dCfE41',
                'asset_name' => 'oathKeeper',
                'event_name' => 'OathTaken',
                'consumer_name' => 'OathKeeper',
                'url' => 'http://jur/api/v1/polling/oath-keeper'
            ]);

            Consumer::firstOrCreate([
                'contract_address' => '0x8a4C0Ff5C39E0eF5cfbe72a57603b11af3dCfE41',
                'asset_name' => 'oathKeeper',
                'event_name' => 'IHoldYourOathFulfilled',
                'consumer_name' => 'OathKeeper',
                'url' => 'http://jur/api/v1/polling/oath-keeper'
            ]);
        }
    }
}
