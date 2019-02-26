<?php

use App\Models\ContractStatus;
use Illuminate\Database\Seeder;

class ContractStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = config('jur.statuses');
        foreach ($statuses as $status) {
            ContractStatus::create($status);
        }
    }
}
