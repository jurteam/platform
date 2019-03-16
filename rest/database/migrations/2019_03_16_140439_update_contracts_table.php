<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateContractsTable extends Migration
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
            $table->enum('in_case_of_dispute', ['open', 'hubs'])->nullable()->after('value');
            $table->renameColumn('part_a_public_name', 'part_a_name');
            $table->renameColumn('part_b_public_name', 'part_b_name');
            $table->integer('part_a_penalty_fee')->default(0)->change();
            $table->integer('part_b_penalty_fee')->default(0)->change();
            $table->dropColumn('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
