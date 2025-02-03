<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    public function rules(User $user): array
    {
        return [
            'name' => ['required'],
            'login' => ['required', 'unique:users,login,' . $this->route('user')->id],
            'email' => ['required', 'email', 'unique:users,email,' . $this->route('user')->id],
            'password' => ['required', 'confirmed'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
