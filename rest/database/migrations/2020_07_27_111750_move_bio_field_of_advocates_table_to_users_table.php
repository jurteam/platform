<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MoveBioFieldOfAdvocatesTableToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('bio', 1000)->after('wallet')->nullable();
        });

        $advocates = DB::table('advocates')->get();

        foreach ($advocates as $advocate) {
            if (isset($advocate->bio)) {
                DB::table('users')->where('wallet', $advocate->wallet)->update(['bio' => $advocate->bio]);
            }
        }

        Schema::table('advocates', function (Blueprint $table) {
            $table->dropColumn('bio');
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
            $table->string('bio', 1000)->after('wallet')->nullable();
        });

        $users = DB::table('users')->get();

        foreach ($users as $user) {
            if (isset($user->bio)) {
                DB::table('advocates')->where('wallet', $user->wallet)->update(['bio' => $user->bio]);
            }
        }

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('bio');
        });

    }
}
