<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractStatusHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contract_status_histories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('contract_id');
            $table->unsignedInteger('contract_status_id');
            $table->timestamps();
            $table->timestamp('chain_updated_at')->nullable();

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
        Schema::dropIfExists('contract_status_histories');
    }
}
