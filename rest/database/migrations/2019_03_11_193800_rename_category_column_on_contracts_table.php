<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameCategoryColumnOnContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasColumn('contracts', 'in_case_of_dispute'))
        {
            Schema::table('contracts', function (Blueprint $table) {
                $table->dropColumn('in_case_of_dispute');
            });
        }

        if (Schema::hasColumn('contracts', 'contract_kpi'))
        {
            Schema::table('contracts', function (Blueprint $table) {
                $table->renameColumn('contract_kpi', 'kpi');
            });
        }

        if (Schema::hasColumn('contracts', 'category_id'))
        {
            Schema::table('contracts', function (Blueprint $table) {
                $table->renameColumn('category_id', 'category');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('contracts', 'in_case_of_dispute'))
        {
            Schema::table('contracts', function (Blueprint $table) {
                $table->dropColumn('in_case_of_dispute');
            });
        }

        if (Schema::hasColumn('contracts', 'category'))
        {
            Schema::table('contracts', function (Blueprint $table) {
                $table->renameColumn('category', 'category_id');
            });
        }

        if (Schema::hasColumn('contracts', 'kpi'))
        {
            Schema::table('contracts', function (Blueprint $table) {
                $table->renameColumn('kpi', 'contract_kpi');
            });
        }
    }
}
