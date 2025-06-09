<?php

namespace App\Auth;

use App\DTO\LoginDTO;
use App\Exceptions\LoginFailedException;
use App\Ldap\User;
use Illuminate\Support\Facades\Auth;

class LdapAuth implements HandlerInterface
{
    public function handle(LoginDTO $loginDTO): bool
    {
        $credentials = [
            'sAMAccountName' => $loginDTO->login,
            'password' => $loginDTO->password,
        ];

        $user = User::query()
            ->where('sAMAccountName', $credentials['sAMAccountName'])
            ->first();

        if(!$user)
            throw new LoginFailedException('Пользователь не найден');

        $user_in_group = $user->groups()
            ->where('cn', 'FNS-web')
            ->exists();

        if(!$user_in_group)
            throw new LoginFailedException('Пользователь не состоит в группе');

        return Auth::attempt($credentials);
    }
}
