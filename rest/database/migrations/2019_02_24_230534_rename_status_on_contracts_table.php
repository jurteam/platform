<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameStatusOnContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->renameColumn('status', 'contract_status_id');
        });
        Schema::table('contracts', function (Blueprint $table) {
            $table->unsignedInteger('contract_status_id')->index()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->dropIndex(['contract_status_id']);
        });
        Schema::table('contracts', function (Blueprint $table) {
            $table->renameColumn('contract_status_id', 'status');
        });
        Schema::table('contracts', function (Blueprint $table) {
            $table->string('status')->change();
        });
    }
}
