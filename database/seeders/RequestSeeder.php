<?php

namespace Database\Seeders;

use App\Models\RequestModel;
use Illuminate\Database\Seeder;

class RequestSeeder extends Seeder
{
    public function run(): void
    {
        RequestModel::factory(50)
            ->create();
    }
}
