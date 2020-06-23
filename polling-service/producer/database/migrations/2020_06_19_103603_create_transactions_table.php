<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('asset_name');
            $table->string('event_name');
            $table->string('contract_address');
            $table->unsignedBigInteger('block_number');
            $table->string('transaction_hash');
            $table->string('sender');
            $table->dateTime('timestamp');
            $table->json('data');
            $table->timestamps();

            $table->index(['asset_name', 'event_name', 'contract_address']);
            $table->index(['transaction_hash']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
