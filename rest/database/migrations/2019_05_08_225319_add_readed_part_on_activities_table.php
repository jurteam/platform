<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddReadedPartOnActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->boolean('readed_part_a')->default(false)->after('id');
            $table->boolean('readed_part_b')->default(false)->after('id');
            $table->dropColumn('readed');
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
            $table->dropColumn(['readed_part_a', 'readed_part_b']);
            $table->boolean('readed')->default(false)->after('id');
        });
    }
}
