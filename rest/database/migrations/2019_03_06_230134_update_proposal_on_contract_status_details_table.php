<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateProposalOnContractStatusDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contract_status_details', function (Blueprint $table) {
            $table->dropColumn('contract_proposal');
        });

        Schema::table('contract_status_details', function (Blueprint $table) {
            $table->decimal('proposal_part_a')->default(0);
            $table->decimal('proposal_part_b')->default(0)->after('proposal_part_a');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contract_status_details', function (Blueprint $table) {
            $table->dropColumn(['proposal_part_a', 'proposal_part_b']);
        });
    }
}
