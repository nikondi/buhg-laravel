<?php

namespace App\DTO;

use App\Enums\UserRole;
use Spatie\LaravelData\Data;

class CreateUserDTO extends Data {
    public function __construct(
        public string   $email,
        public string   $name,
        public string   $login,
        public string   $password,
        public string   $password_confirmation,
        public UserRole $role = UserRole::MANAGER,
    ) {
    }

    public static function rules(): array
    {
        return [
            'email' => 'required|string|email|max:255|unique:users,email',
            'login' => 'required|string|max:255|unique:users,login',
            'name' => 'required|string|max:255',
            'password' => 'required|string|confirmed',
        ];
    }

    public static function messages(...$args): array
    {
        return [
            'email.unique' => 'Пользователь с таким E-mail уже существует!',
            'login.unique' => 'Пользователь с таким логином уже существует!',
        ];
    }
}
