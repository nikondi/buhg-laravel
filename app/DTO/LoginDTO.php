<?php

namespace App\DTO;

use Spatie\LaravelData\Data;

class LoginDTO extends Data {
    public function __construct(
        public string $login,
        public string $password
    )
    {
    }

    public static function rules(): array
    {
        return [
            'login' => 'required',
            'password' => 'required',
        ];
    }
}
