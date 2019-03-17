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
            $table->dropColumn('type');
            $table->boolean('readed')->after('id')->default(false);
            $table->string('to_wallet')->nullable()->after('readed');
            $table->renameColumn('value', 'status');
            $table->text('message')->after('to_wallet');
            $table->decimal('proposal_part_a', 10, 10)->default(0)->after('message');
            $table->decimal('proposal_part_b', 10, 10)->default(0)->after('proposal_part_a');
            $table->text('abstract')->nullable()->after('proposal_part_b');
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
            //
        });
    }
}
