<?php

namespace Database\Seeders;

use App\Enums\DirectorType;
use App\Models\Director;
use Illuminate\Database\Seeder;

class DirectorSeeder extends Seeder
{
    public function run(): void
    {
        if(Director::query()->count() === 0) {
            Director::create([
                'surname' => 'Загеева',
                'name' => 'Лилия',
                'lastname' => 'Александровна',
                'document' => 'Паспорт',
                'type' => DirectorType::LEADER,
            ]);
        }
    }
}
