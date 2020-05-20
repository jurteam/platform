<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOathAnalyticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oath_analytics', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->enum('card', ['average-amount', 'active-amount', 'amount-by-oath-keeper', 'active-oath-keeper']);
            $table->enum('duration', ['Last Month', '6 Months', 'Year']);
            $table->decimal('value', 36, 18)->nullable();
            $table->decimal('delta')->nullable();
            $table->json('graph')->nullable();
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
        Schema::dropIfExists('oath_analytics');
    }
}
