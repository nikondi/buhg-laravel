<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'director_id' => ['nullable', 'exists:directors,id'],
            'organization_id' => ['nullable', 'exists:organizations,id'],
            'number' => ['nullable', 'digits:12', 'string', 'unique:requests,number,' . $this->route('request')->id],
            'status' => ['required'],
            'education_type' => ['required'],
            'pickup_type' => ['required'],
            'surname' => ['required'],
            'name' => ['required'],
            'lastname' => ['nullable'],
            'phone' => ['required', 'digits:10'],
            'email' => ['required', 'email', 'ends_with:.ru'],
            'birthdate' => ['required', 'date'],
            'inn' => ['required', 'digits:12'],
            'doc_type' => ['required', 'numeric'],
            'doc_number' => ['required'],
            'doc_date' => ['required'],
            'contract_number' => ['required'],
            'contract_date' => ['required', 'date'],
            'contract_cost' => ['required', 'numeric'],
            'report_year' => ['required', 'integer', 'between:2000,2200'],
            'same_student' => ['boolean'],

            'student_inn' => ['nullable', 'digits:12', 'required_if:same_student,false'],
            'student_surname' => ['nullable', 'required_if:same_student,false'],
            'student_name' => ['nullable', 'required_if:same_student,false'],
            'student_lastname' => ['nullable', 'required_if:same_student,false'],
            'student_phone' => ['nullable', 'digits:10', 'required_if:same_student,false'],
            'student_birthdate' => ['nullable', 'date', 'required_if:same_student,false'],
            'student_doc_type' => ['nullable', 'numeric', 'required_if:same_student,false'],
            'student_doc_number' => ['nullable', 'required_if:same_student,false'],
            'student_doc_date' => ['nullable', 'required_if:same_student,false'],

            'comment' => ['nullable'],
            'save_history' => ['boolean'],
            'changes_count' => ['numeric']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
