<?php

use App\Models\Asset;
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
            Asset::firstOrCreate(
                [
                    'asset_name' => 'oathKeeper',
                    'contract_address' => '0x8a4C0Ff5C39E0eF5cfbe72a57603b11af3dCfE41'
                ],
                [
                    'abi' => json_decode('[{"inputs":[{"internalType":"address","name":"_jurToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_beneficiary","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_oathIndex","type":"uint256"}],"name":"IHoldYourOathFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_beneficiary","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_lockInPeriod","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_startAt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_releaseAt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_oathIndex","type":"uint256"}],"name":"OathTaken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"jurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockMap","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"startAt","type":"uint256"},{"internalType":"uint256","name":"releaseAt","type":"uint256"},{"internalType":"uint256","name":"lockInPeriod","type":"uint256"},{"internalType":"bool","name":"isOathFulfilled","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumLockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumLockAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumLockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"oathStats","outputs":[{"internalType":"uint256","name":"count","type":"uint256"},{"internalType":"uint256","name":"totalAmountLocked","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalLockedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalOathCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_lockInPeriod","type":"uint256"}],"name":"takeAnOath","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_lockInPeriod","type":"uint256"},{"internalType":"address","name":"_oathTaker","type":"address"}],"name":"takeAnOathJUR","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_oathIndex","type":"uint256"}],"name":"releaseOath","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_minimumLockPeriod","type":"uint256"},{"internalType":"uint256","name":"_maximumLockPeriod","type":"uint256"}],"name":"updateLockPeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]'),
                    'default_from_block' => '6114000'
                ]);
            Asset::firstOrCreate(
                [
                    'asset_name' => 'jurStatus',
                    'contract_address' => '0x26e82bee7d1369c2969f7fb9c33fb10926708850'
                ],
                [
                    'abi' => json_decode('[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"uint256","name":"activationTime","type":"uint256"},{"indexed":false,"internalType":"string","name":"statusType","type":"string"}],"name":"StatusAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"bool","name":"newState","type":"bool"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"StateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"statusHolder","type":"address"},{"indexed":false,"internalType":"string","name":"statusType","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"StatusTypeChanged","type":"event"}]'),
                    'default_from_block' => '6358470'
                ]);
            Asset::firstOrCreate(
                [
                    'asset_name' => 'jurAdvocate',
                    'contract_address' => '0x65f2bca97caf8429cbb34e6146197fa12cdde417'
                ],
                [
                    'abi' => json_decode('[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"activationTime","type":"uint256"},{"indexed":false,"internalType":"string","name":"advocateType","type":"string"}],"name":"AdvocateAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"bool","name":"newState","type":"bool"}],"name":"AdvocateStateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"string","name":"advocateType","type":"string"}],"name":"AdvocateTypeUpdated","type":"event"}]'),
                    'default_from_block' => '6358421'
                ]);
            Asset::firstOrCreate(
                [
                    'asset_name' => 'jurRewards',
                    'contract_address' => '0x517952463df7c7c951faA7cA914d4Ef56DB99498'
                ],
                [
                    'abi' => json_decode('[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"contractAddress","type":"address"},{"indexed":false,"internalType":"string","name":"role","type":"string"},{"indexed":false,"internalType":"bool","name":"status","type":"bool"}],"name":"RoleContractUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"activityId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"slotCount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"address[]","name":"whitelistContractAddresses","type":"address[]"}],"name":"ActivityCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"activityId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"slotCount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"newState","type":"bool"}],"name":"ActivityUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"manager","type":"address"},{"indexed":true,"internalType":"bool","name":"state","type":"bool"}],"name":"ManagerUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"activityId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"slotId","type":"uint256"},{"indexed":false,"internalType":"address","name":"assignedTo","type":"address"},{"indexed":false,"internalType":"uint256","name":"createdAt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"dueDate","type":"uint256"}],"name":"SlotAssigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"activityId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"slotId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardAmount","type":"uint256"}],"name":"SlotRewarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"activityId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"slotId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newState","type":"string"}],"name":"SlotUpdated","type":"event"}]'),
                    'default_from_block' => '6434140'
                ]);
            Asset::firstOrCreate(
                [
                    'asset_name' => 'jurToken',
                    'contract_address' => '0x602b7A4309b3412D269C6CdDdAd962C0b94494d8'
                ],
                [
                    'abi' => json_decode('[{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]'),
                    'default_from_block' => '6208244'
                ]);
            Asset::firstOrCreate(
                [
                    'asset_name' => 'arbitrationFactory',
                    'contract_address' => '0x31d422A657E87FBFfb87e4cbC0d23ef63A55cEB4'
                ],
                [
                    'abi' => json_decode('[{"anonymous":false,"inputs":[{"indexed":true,"name":"_creator","type":"address"},{"indexed":false,"name":"_arbitration","type":"address"},{"indexed":true,"name":"_party1","type":"address"},{"indexed":true,"name":"_party2","type":"address"},{"indexed":false,"name":"_dispersal","type":"uint256[]"},{"indexed":false,"name":"_funding","type":"uint256[]"},{"indexed":false,"name":"_agreementHash","type":"bytes32"}],"name":"ArbitrationCreated","type":"event"}]'),
                    'default_from_block' => ' 5923931'
                ]);

        }
    }
}
