<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetDaysHoursMinutesToNullOnContractsTable extends Migration
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
            $table->integer('duration_days')->default(0)->change();
            $table->integer('duration_hours')->default(0)->change();
            $table->integer('duration_minutes')->default(0)->change();
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
            $table->enum('in_case_of_dispute', ['open', 'hubs'])->nullable()->after('value');
            $table->integer('duration_days')->nullable()->change();
            $table->integer('duration_hours')->nullable()->change();
            $table->integer('duration_minutes')->nullable()->change();
        });
    }
}
