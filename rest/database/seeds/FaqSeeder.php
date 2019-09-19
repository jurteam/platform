<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('faqs')->insert([
            'title' => 'What is the Open Layer?',
            'description' => 'The Open Layer is a decentralized oracle that allows any JUR token holder to express their vote on open disputes. This is done through a mechanism that optimizes fair dispute resolution in a fast and affordable way.'
        ]);
        DB::table('faqs')->insert([
            'title' => 'How do I create a contract?',
            'description' => 'It\'s simple, login through Comet and click on Create Smart Legal Contract then you should be able to follow the wizard. Remember that you can upload also existing paper contracts by explaining its content in the KPI and the Resolution Proof. If you need any assistance feel free to contact us through the Jur Official Telegram Community we are here to help!'
        ]);
        DB::table('faqs')->insert([
            'title' => 'How can I be sure that the dispute voting will be fair?',
            'description' => 'The voting system is based on game theoretic principles that incentivizes fair and quick voting on the dispute. If your counterparty is on the wrong side there will be a big disincentive to vote on his/her side as oracles voting the wrong side will end up losing tokens. If you want to know more check the following link in which the voting system is explained in a detailed way.'
        ]);
        DB::table('faqs')->insert([
            'title' => 'How will I get my money back if I am right?',
            'description' => 'Once a dispute is settled the tokens will be automatically distributed according to the dispute resolution proposal that has won. E.g. you proposed to get back 90% of the tokens in the contract and you counterparty 10%. Your dispute resolution proposal is the one judged the fairest hence tokens will be hitting your and your counterparty\'s wallet accordingly'
        ]);
        DB::table('faqs')->insert([
            'title' => 'Is this running in production? When you will be releasing the other features?',
            'description' => 'As of now Jur has released this product in order to test the Open Layer voting system and hence is based on the VeChain Thor testnet and mainnet. In this way we can engage with the community in order to test and optimize this layer. As per the new features please do check out the following link with the updated tech roadmap, we are waiting for your contribution, feedback and ideas!'
        ]);
    }
}
