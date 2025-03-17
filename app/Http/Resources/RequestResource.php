<?php

namespace App\Http\Resources;

use App\Models\RequestModel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/** @mixin RequestModel */
class RequestResource extends JsonResource
{
    public static $wrap = false;
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'status' => $this->status,

            'name' => $this->name,
            'surname' => $this->surname,
            'lastname' => $this->lastname,

            'email' => $this->email,
            'phone' => $this->phone,

            'birthdate' => $this->birthdate?->format('Y-m-d'),
            'inn' => $this->inn,

            'doc_type' => $this->doc_type,
            'doc_number' => $this->doc_number,
            'doc_date' => $this->doc_date->format('Y-m-d'),

            'contract_number' => $this->contract_number,
            'contract_date' => $this->contract_date?->format('Y-m-d'),
            'contract_cost' => $this->contract_cost,
            'report_year' => $this->report_year,

            'same_student' => $this->same_student,

            'student_name' => $this->student_name,
            'student_surname' => $this->student_surname,
            'student_lastname' => $this->student_lastname,

            'student_birthdate' => $this->student_birthdate?->format('Y-m-d'),
            'student_inn' => $this->student_inn,

            'student_phone' => $this->student_phone,

            'student_doc_type' => $this->student_doc_type,
            'student_doc_number' => $this->student_doc_number,
            'student_doc_date' => $this->student_doc_date?->format('Y-m-d'),

            'education_type' => $this->education_type,
            'pickup_type' => $this->pickup_type,

            'director_id' => $this->director_id,
            'organization_id' => $this->organization_id,

            'changes_count' => $this->changes_count,

            'files' => $this->getFileUrls()
        ];
    }
}
