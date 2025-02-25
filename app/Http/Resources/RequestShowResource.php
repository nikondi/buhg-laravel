<?php

namespace App\Http\Resources;

use App\Models\RequestModel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin RequestModel */
class RequestShowResource extends JsonResource
{
    public static $wrap = false;
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'status' => $this->status->label(),

            'fio' => sprintf("%s %s %s", $this->surname, $this->name, $this->lastname),

            'email' => $this->email,
            'phone' => $this->phone,

            'birthdate' => $this->birthdate?->format('d.m.Y'),
            'inn' => $this->inn,

            'doc_type' => $this->doc_type?->label(),
            'doc_number' => $this->doc_number,
            'doc_date' => $this->doc_date->format('d.m.Y'),

            'contract_number' => $this->contract_number,
            'contract_date' => $this->contract_date?->format('d.m.Y'),
            'contract_cost' => $this->contract_cost,
            'report_year' => $this->report_year,

            'same_student' => $this->same_student,

            'student_fio' => sprintf("%s %s %s", $this->student_surname, $this->student_name, $this->student_lastname),

            'student_birthdate' => $this->student_birthdate?->format('d.m.Y'),
            'student_inn' => $this->student_inn,

            'student_phone' => $this->student_phone,

            'student_doc_type' => $this->student_doc_type?->label(),
            'student_doc_number' => $this->student_doc_number,
            'student_doc_date' => $this->student_doc_date?->format('d.m.Y'),

            'education_type' => $this->education_type->label(),
            'pickup_type' => $this->pickup_type,
            'pickup_type_label' => $this->pickup_type->label(),

            'director' => [
                'fio' => sprintf("%s %s %s", $this->director->surname, $this->director->name, $this->director->lastname),
                'type' => $this->director->type->label(),
            ],
            'organization' => [
                'name' => $this->organization->name,
                'inn' => $this->organization->inn,
                'kpp' => $this->organization->kpp,
            ],

            'history_count' => $this->history_count,

            'files' => $this->getFileUrls()
        ];
    }
}
