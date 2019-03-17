<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAndUpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('accept_terms', 'accepted_terms');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->boolean('accepted_disclaimer')->default(false)->after('accepted_terms');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('accepted_terms', 'accept_terms');
            $table->dropColumn('accepted_disclaimer');
        });
    }
}
