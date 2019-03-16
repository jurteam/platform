<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->text('message')->nullable()->change();
            $table->integer('proposal_part_a')->default(0)->change();
            $table->integer('proposal_part_b')->default(0)->change();
            $table->text('abstract')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->text('message')->change();
            $table->decimal('proposal_part_a', 10, 10)->default(0)->change();
            $table->decimal('proposal_part_b', 10, 10)->default(0)->change();
            $table->text('abstract')->change();
        });
    }
}
