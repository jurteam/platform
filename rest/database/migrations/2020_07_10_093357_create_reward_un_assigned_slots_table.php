<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRewardUnAssignedSlotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reward_un_assigned_slots', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('slot_id');
            $table->string('un_assigned_wallet');
            $table->timestamps();

            $table->foreign('slot_id')->references('id')->on('slots')->onDelete('cascade');
            $table->index('un_assigned_wallet');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reward_un_assigned_slots');
    }
}
