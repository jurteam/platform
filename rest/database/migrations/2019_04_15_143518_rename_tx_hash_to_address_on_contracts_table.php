<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameTxHashToAddressOnContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->dropColumn('in_case_of_dispute');
        });

        Schema::table('contracts', function (Blueprint $table) {
            $table->renameColumn('tx_hash', 'address');
            $table->enum('in_case_of_dispute', ['open', 'hubs'])->nullable()->after('value');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->dropColumn('in_case_of_dispute');
        });

        Schema::table('contracts', function (Blueprint $table) {
            $table->renameColumn('address', 'tx_hash');
            $table->enum('in_case_of_dispute', ['open', 'hubs'])->nullable()->after('value');
        });
    }
}
