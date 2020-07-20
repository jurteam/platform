<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBioFieldOnAdvocatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('advocates', function (Blueprint $table) {
            $table->string('bio',1000)->after('wallet')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('advocates', function (Blueprint $table) {
           $table->string('bio')->after('wallet')->nullable()->change();
        });
    }
}
