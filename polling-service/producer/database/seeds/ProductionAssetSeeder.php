<?php

use Illuminate\Database\Seeder;

class ProductionAssetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        {
            DB::table('assets')->insert([
                'asset_name' => 'jurToken',
                'contract_address' => '0x46209d5e5a49c1d403f4ee3a0a88c3a27e29e58d',
                'abi' => '[{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]',
                'default_from_block' => 3572455
            ]);
            DB::table('assets')->insert([
                'asset_name' => 'arbitrationFactory',
                'contract_address' => '0x74938eA672114674d69DBf24C2FD4a9D5fBA9Db8',
                'abi' => '[{"anonymous":false,"inputs":[{"indexed":true,"name":"_creator","type":"address"},{"indexed":false,"name":"_arbitration","type":"address"},{"indexed":true,"name":"_party1","type":"address"},{"indexed":true,"name":"_party2","type":"address"},{"indexed":false,"name":"_dispersal","type":"uint256[]"},{"indexed":false,"name":"_funding","type":"uint256[]"},{"indexed":false,"name":"_agreementHash","type":"bytes32"}],"name":"ArbitrationCreated","type":"event"}]',
                'default_from_block' => 6077268
            ]);
            // DB::table('assets')->insert([
            //     'asset_name' => 'oathKeeper',
            //     'contract_address' => '',
            //     'abi' => '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_beneficiary","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_oathIndex","type":"uint256"}],"name":"IHoldYourOathFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_beneficiary","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_lockInPeriod","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_startAt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_releaseAt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_oathIndex","type":"uint256"}],"name":"OathTaken","type":"event"}]',
            //     'default_from_block' => ''
            // ]);
            // DB::table('assets')->insert([
            //     'asset_name' => 'jurStatus',
            //     'contract_address' => '',
            //     'abi' => '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"uint256","name":"activationTime","type":"uint256"},{"indexed":false,"internalType":"string","name":"statusType","type":"string"}],"name":"StatusAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"bool","name":"newState","type":"bool"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"StateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"string","name":"statusType","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"StatusTypeChanged","type":"event"}]',
            //     'default_from_block' => ''
            // ]);
            // DB::table('assets')->insert([
            //     'asset_name' => 'jurAdvocate',
            //     'contract_address' => '',
            //     'abi' => '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"activationTime","type":"uint256"},{"indexed":false,"internalType":"string","name":"advocateType","type":"string"}],"name":"AdvocateAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"bool","name":"newState","type":"bool"}],"name":"AdvocateStateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"string","name":"advocateType","type":"string"}],"name":"AdvocateTypeUpdated","type":"event"}]',
            //     'default_from_block' => ''
            // ]);
            // DB::table('assets')->insert([
            //     'asset_name' => 'jurRewards',
            //     'contract_address' => '',
            //     'abi' => '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"uint256","name":"activationTime","type":"uint256"},{"indexed":false,"internalType":"string","name":"statusType","type":"string"}],"name":"StatusAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"bool","name":"newState","type":"bool"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"StateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"string","name":"statusType","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"StatusTypeChanged","type":"event"}]',
            //     'default_from_block' => ''
            // ]);
        }
    }
}
