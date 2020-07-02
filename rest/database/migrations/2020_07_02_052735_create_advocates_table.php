<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdvocatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advocates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('sc_adovocate_id');
            $table->string('wallet');
            $table->dateTime('activation_time');
            $table->boolean('is_active');
            $table->string('type');
            $table->timestamps();

            $table->index(['wallet']);
            $table->index(['type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('advocates');
    }
}
