<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSlotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('slots', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('reward_activity_id');
            $table->unsignedInteger('sc_slot_id');
            $table->string('assigned_wallet');
            $table->decimal('reward_amount', 36, 18);
            $table->enum('status', ['Unassigned', 'Assigned', 'Completed', 'Cancelled', 'Rewarded', 'OverDue']);
            $table->timestamps();

            $table->foreign('reward_activity_id')->references('id')->on('reward_activities')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('slots');
    }
}
