<?php

namespace Database\Factories;

use App\Enums\DocumentType;
use App\Enums\EducationType;
use App\Enums\PickupType;
use App\Enums\RequestStatus;
use App\Models\Director;
use App\Models\RequestModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class RequestModelFactory extends Factory
{
    protected $model = RequestModel::class;

    public function definition(): array
    {
        $same_student = $this->faker->boolean();
        $student_data = [];

        if($same_student) {
            $student_data = [
                'student_surname' => $this->faker->firstName(),
                'student_name' => $this->faker->firstName(),
                'student_lastname' => $this->faker->lastName(),
                'student_phone' => $this->faker->numberBetween(9000000000, 9999999999),
                'student_birthdate' => $this->faker->date(),
                'student_inn' => $this->faker->numberBetween(100000000000, 900000000000),
                'student_doc_type' => array_rand(DocumentType::getLabels()),
                'student_doc_number' => $this->faker->numberBetween(4220000000, 4222000000),
                'student_doc_date' => $this->faker->date(),
            ];
        }

        $createdAt = $this->faker->dateTimeBetween('-1 years', 'now');

        return [
            'uuid' => $this->faker->uuid(),
            'status' => RequestStatus::cases()[array_rand(RequestStatus::cases())],
            'education_type' => EducationType::cases()[array_rand(EducationType::cases())],
            'pickup_type' => PickupType::cases()[array_rand(PickupType::cases())],
            'changes_count' => 0,
            'surname' => $this->faker->firstName(),
            'name' => $this->faker->firstName(),
            'lastname' => $this->faker->lastName(),
            'phone' => $this->faker->numberBetween(9000000000, 9999999999),
            'email' => $this->faker->unique()->safeEmail(),
            'birthdate' => $this->faker->date(),
            'inn' => $this->faker->numberBetween(100000000000, 900000000000),
            'doc_type' => array_rand(DocumentType::getLabels()),
            'doc_number' => $this->faker->numberBetween(4220000000, 4222000000),
            'doc_date' => $this->faker->date(),
            'contract_number' => $this->faker->numberBetween(45, 48).'-'.$this->faker->numberBetween(100, 500),
            'contract_date' => $this->faker->date(),
            'contract_cost' => $this->faker->randomFloat(2, 40000, 100000),
            'report_year' => $this->faker->numberBetween(2020, 2025),
            'same_student' => $this->faker->boolean(),

            ...$student_data,

            'created_at' => $createdAt,
            'updated_at' => $createdAt,

            'director_id' => Director::all()->random()->id,
            'organization_id' => Director::all()->random()->id,
        ];
    }
}
