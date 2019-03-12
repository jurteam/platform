<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractStatusDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contract_status_details', function (Blueprint $table) {
            $table->increments('id');
            $table->text('message')->nullable();
            $table->string('contract_part');
            $table->string('contract_proposal');
            $table->timestamp('payed_at')->nullable();
            $table->unsignedInteger('contract_id');
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
        Schema::dropIfExists('contract_status_details');
    }
}
