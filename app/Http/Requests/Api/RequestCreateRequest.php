<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class RequestCreateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'number' => ['nullable'],
            'director_id' => ['nullable', 'exists:directors,id'],
            'organization_id' => ['nullable', 'exists:organizations,id'],
            'status' => ['required'],
            'education_type' => ['required'],
            'pickup_type' => ['required'],
            'surname' => ['required'],
            'name' => ['required'],
            'lastname' => ['nullable'],
            'phone' => ['required'],
            'email' => ['required', 'email'],
            'birthdate' => ['required', 'date'],
            'inn' => ['required'],
            'doc_type' => ['required', 'numeric'],
            'doc_number' => ['required'],
            'doc_date' => ['required', 'date'],
            'contract_number' => ['required'],
            'contract_date' => ['required', 'date'],
            'contract_cost' => ['required', 'numeric'],
            'report_year' => ['required'],
            'same_student' => ['boolean'],
            'student_surname' => ['nullable'],
            'student_name' => ['nullable'],
            'student_lastname' => ['nullable'],
            'student_phone' => ['nullable'],
            'student_birthdate' => ['nullable', 'date'],
            'student_inn' => ['nullable'],
            'student_doc_type' => ['nullable', 'numeric'],
            'student_doc_number' => ['nullable'],
            'student_doc_date' => ['nullable', 'date'],
            'files' => []
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
