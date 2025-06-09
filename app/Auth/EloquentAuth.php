<?php

namespace App\Auth;

use App\DTO\LoginDTO;
use Illuminate\Support\Facades\Auth;

class EloquentAuth implements HandlerInterface
{
    public function handle(LoginDTO $loginDTO): bool
    {
        $credentials = [
            'login' => $loginDTO->login,
            'password' => $loginDTO->password,
        ];

        return Auth::attempt($credentials);
    }
}
