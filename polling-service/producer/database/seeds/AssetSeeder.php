<?php

use Illuminate\Database\Seeder;

class AssetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('assets')->insert([
            'asset_name' => 'oathKeeper',
            'contract_address' => '0xD689Db4A731cbb216E81C2F6096c583e329A9B48',
            'abi' => '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_beneficiary","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_oathIndex","type":"uint256"}],"name":"IHoldYourOathFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_beneficiary","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_lockInPeriod","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_startAt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_releaseAt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_oathIndex","type":"uint256"}],"name":"OathTaken","type":"event"}]',
            'default_from_block' => '6114000'
        ]);
        DB::table('assets')->insert([
            'asset_name' => 'jurStatus',
            'contract_address' => '0x3e47260caa2eb7df1cd6bc125d4bce01e1738629',
            'abi' => '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"uint256","name":"activationTime","type":"uint256"},{"indexed":false,"internalType":"string","name":"statusType","type":"string"}],"name":"StatusAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"bool","name":"newState","type":"bool"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"StateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"string","name":"statusType","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"StatusTypeChanged","type":"event"}]',
            'default_from_block' => '6358470'
        ]);
        DB::table('assets')->insert([
            'asset_name' => 'jurAdvocate',
            'contract_address' => '0x79481d8933832e63BE499beADdcd49ac9a809FEF',
            'abi' => '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"activationTime","type":"uint256"},{"indexed":false,"internalType":"string","name":"advocateType","type":"string"}],"name":"AdvocateAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"bool","name":"newState","type":"bool"}],"name":"AdvocateStateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"string","name":"advocateType","type":"string"}],"name":"AdvocateTypeUpdated","type":"event"}]',
            'default_from_block' => '6358421'
        ]);
        DB::table('assets')->insert([
            'asset_name' => 'jurRewards',
            'contract_address' => '0x4e5634BfBd9C35BA197BeEa921a204E30D202fA0',
            'abi' => '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"uint256","name":"activationTime","type":"uint256"},{"indexed":false,"internalType":"string","name":"statusType","type":"string"}],"name":"StatusAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"bool","name":"newState","type":"bool"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"StateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"string","name":"statusType","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"StatusTypeChanged","type":"event"}]',
            'default_from_block' => '6366505'
        ]);
        DB::table('assets')->insert([
            'asset_name' => 'jurToken',
            'contract_address' => '0x602b7A4309b3412D269C6CdDdAd962C0b94494d8',
            'abi' => '[{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]',
            'default_from_block' => '6208244'
        ]);
    }
}
