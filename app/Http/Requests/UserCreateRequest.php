<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'login' => ['required', 'unique:users'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'confirmed'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
