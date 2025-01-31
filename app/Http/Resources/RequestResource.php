<?php

namespace App\Http\Resources;

use App\Models\Request as RequestModel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin RequestModel */
class RequestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,

            'name' => $this->name,
            'surname' => $this->surname,
            'lastname' => $this->lastname,
            'birthdate' => $this->birthdate,
            'inn' => $this->inn,
            'doc_type' => $this->doc_type,
            'doc_number' => $this->doc_number,
            'doc_date' => $this->doc_date,

            'contract_number' => $this->contract_number,
            'contract_date' => $this->contract_date,
            'contract_cost' => $this->contract_cost,
            'contract_year' => $this->contract_year,

            'same_student' => $this->same_student,

            'student_name' => $this->student_name,
            'student_surname' => $this->student_surname,
            'student_lastname' => $this->student_lastname,
            'student_birthdate' => $this->student_birthdate,
            'student_doc_type' => $this->student_doc_type,
            'student_doc_number' => $this->student_doc_number,
            'student_doc_date' => $this->student_doc_date,
            'education_type' => $this->education_type,
            'pickup_type' => $this->pickup_type,

            'director_id' => $this->director_id,
            'organization_id' => $this->organization_id,
        ];
    }
}
