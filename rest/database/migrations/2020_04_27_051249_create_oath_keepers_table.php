<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOathKeepersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oath_keepers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('wallet')->unique();
            $table->decimal('total_amount', 36, 18)->nullable();
            $table->decimal('active_amount', 36, 18)->nullable();
            $table->unsignedInteger('total_oath_count')->nullable();
            $table->unsignedInteger('active_oath_count')->nullable();
            $table->unsignedInteger('rank')->nullable();
            $table->decimal('rank_point', 32, 12)->nullable();
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
        Schema::dropIfExists('oath_keepers');
    }
}
