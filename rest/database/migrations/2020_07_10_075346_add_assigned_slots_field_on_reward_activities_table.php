<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAssignedSlotsFieldOnRewardActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reward_activities', function (Blueprint $table) {
            $table->integer('assigned_slots')->after('number_of_slots')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reward_activities', function (Blueprint $table) {
            $table->dropColumn('assigned_slots');
        });
    }
}
