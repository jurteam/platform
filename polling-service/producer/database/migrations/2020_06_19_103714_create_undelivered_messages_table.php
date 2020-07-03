<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUndeliveredMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('undelivered_messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('consumer_id')->nullable();
            $table->unsignedBigInteger('transaction_id')->nullable();
            $table->integer('error_code')->nullable();
            $table->string('error_message')->nullable();
            $table->integer('retries')->nullable();
            $table->dateTime('next_try_at')->nullable();
            $table->enum('status', ['active', 'failed'])->nullable();
            $table->timestamps();

            $table->foreign('consumer_id')->references('id')->on('consumers')->onDelete('cascade');
            $table->foreign('transaction_id')->references('id')->on('transactions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('undelivered_messages');
    }
}
