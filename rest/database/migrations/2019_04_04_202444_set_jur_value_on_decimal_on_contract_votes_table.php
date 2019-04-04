<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetJurValueOnDecimalOnContractVotesTable extends Migration
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
            $table->decimal('value', 36, 18)->change();
            $table->enum('in_case_of_dispute', ['open', 'hubs'])->nullable()->after('value');
        });

        Schema::table('contract_votes', function (Blueprint $table) {
            $table->decimal('amount', 36, 18)->change();
        });

        Schema::table('contract_status_details', function (Blueprint $table) {
            $table->decimal('proposal_part_a', 36, 18)->change();
            $table->decimal('proposal_part_b', 36, 18)->change();
        });

        Schema::table('activities', function (Blueprint $table) {
            $table->decimal('proposal_part_a', 36, 18)->change();
            $table->decimal('proposal_part_b', 36, 18)->change();
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
            $table->integer('value')->change();
            $table->enum('in_case_of_dispute', ['open', 'hubs'])->nullable()->after('value');
        });

        Schema::table('contract_votes', function (Blueprint $table) {
            $table->integer('amount')->change();
        });

        Schema::table('contract_status_details', function (Blueprint $table) {
            $table->integer('proposal_part_a')->change();
            $table->integer('proposal_part_b')->change();
        });

        Schema::table('activities', function (Blueprint $table) {
            $table->integer('proposal_part_a')->change();
            $table->integer('proposal_part_b')->change();
        });
    }
}
