<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDurationFieldsOnContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->integer('duration_days')->nullable()->after('part_b_penalty_fee');
            $table->integer('duration_hours')->nullable()->after('duration_days');
            $table->integer('duration_minutes')->nullable()->after('duration_hours');
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
            $table->dropColumn(['duration_days', 'duration_hours', 'duration_minutes']);
        });
    }
}
