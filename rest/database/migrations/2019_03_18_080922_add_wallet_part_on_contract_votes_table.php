<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddWalletPartOnContractVotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contract_votes', function (Blueprint $table) {
            $table->renameColumn('description', 'message');
            $table->renameColumn('jur_token', 'amount');
            $table->string('wallet_part')->after('oracle_wallet');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contract_votes', function (Blueprint $table) {
            $table->renameColumn('message', 'description');
            $table->renameColumn('amount', 'jur_token');
            $table->dropColumn('wallet_part');
        });
    }
}
