<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivityAvailabilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activity_availabilities', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('reward_activity_id');
            $table->unsignedBigInteger('user_contract_id');
            $table->timestamps();

            $table->foreign('reward_activity_id')->references('id')->on('reward_activities')->onDelete('cascade');
            $table->foreign('user_contract_id')->references('id')->on('user_contracts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activity_availabilities');
    }
}
