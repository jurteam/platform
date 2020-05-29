<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOathsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oaths', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('oath_keeper_id')->nullable();
            $table->string('wallet');
            $table->unsignedBigInteger('oath_index');
            $table->decimal('amount', 36, 18);
            $table->decimal('fiat_value');
            $table->unsignedInteger('lock_in_period');
            $table->dateTime('start_at');
            $table->dateTime('release_at');
            $table->enum('current_state', ['active', 'complete', 'withdrawn']);
            $table->dateTime('withdrawn_at')->nullable();
            $table->timestamps();

            $table->foreign('oath_keeper_id')->references('id')->on('oath_keepers')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('oaths');
    }
}
