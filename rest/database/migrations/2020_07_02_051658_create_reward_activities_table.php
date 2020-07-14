<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRewardActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reward_activities', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('sc_activity_id');
            $table->string('name');
            $table->decimal('reward_amount', 36, 18);
            $table->integer('number_of_slots');
            $table->boolean('is_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reward_activities');
    }
}
