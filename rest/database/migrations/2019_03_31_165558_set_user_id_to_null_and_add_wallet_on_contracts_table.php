<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetUserIdToNullAndAddWalletOnContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contracts', function(Blueprint $table) {
            $table->dropColumn('in_case_of_dispute');
        });

        Schema::table('contracts', function (Blueprint $table) {
            $table->enum('in_case_of_dispute', ['hubs', 'open'])->nullable()->after('value');
            $table->unsignedInteger('user_id')->nullable()->change();
            $table->string('wallet')->nullable()->after('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contracts', function(Blueprint $table) {
            $table->dropColumn('in_case_of_dispute');
        });

        Schema::table('contracts', function (Blueprint $table) {
            $table->enum('in_case_of_dispute', ['hubs', 'open'])->nullable()->after('value');
            $table->unsignedInteger('user_id')->change();
            $table->dropColumn('wallet');
        });
    }
}
