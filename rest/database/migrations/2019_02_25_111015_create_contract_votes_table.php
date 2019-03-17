<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractVotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contract_votes', function (Blueprint $table) {
            $table->increments('id');
            $table->decimal('jur_token', 10, 10);
            $table->string('oracle_wallet');
            $table->unsignedInteger('contract_id');
            $table->text('description');
            $table->string('hash');
            $table->timestamps();

            $table->foreign('contract_id')->references('id')->on('contracts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contract_votes');
    }
}
