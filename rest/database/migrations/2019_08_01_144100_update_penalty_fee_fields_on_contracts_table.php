<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdatePenaltyFeeFieldsOnContractsTable extends Migration
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
            $table->decimal('part_a_penalty_fee', 36, 18)->default(0)->change();
            $table->decimal('part_b_penalty_fee', 36, 18)->default(0)->change();
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
            $table->integer('part_a_penalty_fee')->default(0)->change();
            $table->integer('part_b_penalty_fee')->default(0)->change();
        });
    }
}
