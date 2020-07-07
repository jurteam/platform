<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRewardActivityRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reward_activity_roles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('reward_activity_id');
            $table->unsignedBigInteger('role_contract_id');
            $table->timestamps();

            $table->foreign('reward_activity_id')->references('id')->on('reward_activities')->onDelete('cascade');
            $table->foreign('role_contract_id')->references('id')->on('role_contracts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reward_activity_roles');
    }
}
