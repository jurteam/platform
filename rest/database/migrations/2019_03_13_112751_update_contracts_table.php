<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->dropColumn(['name', 'part_a_name', 'part_b_name']);
            $table->string('part_a_email')->nullable()->after('part_a_wallet');
            $table->string('part_b_email')->nullable()->after('part_b_wallet');
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
            $table->string('name')->nullable();
            $table->dropColumn(['part_a_email', 'part_b_email']);
        });
    }
}
