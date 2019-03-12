<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('part_a_wallet');
            $table->string('part_a_public_name')->nullable();
            $table->string('part_a_name')->nullable();
            $table->string('part_b_wallet');
            $table->string('part_b_public_name')->nullable();
            $table->string('part_b_name')->nullable();
            $table->text('kpi')->nullable();
            $table->text('resolution_proof')->nullable();
            $table->string('category_id')->nullable();
            $table->decimal('value', 10, 10)->default(0);
            $table->boolean('has_penalty_fee')->default(false);
            $table->decimal('part_a_penalty_fee', 10, 10)->default(0);
            $table->decimal('part_b_penalty_fee', 10, 10)->default(0);
            $table->integer('status')->default(0);
            $table->unsignedInteger('user_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contracts');
    }
}
