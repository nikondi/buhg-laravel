<?php

namespace App\Http\Controllers;

use App\Exceptions\LoginFailedException;
use App\Http\Requests\LoginRequest;
use App\Ldap\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login()
    {
        return page()
            ->title('Авторизация')
            ->render('Auth/Login');
    }

    public function handle(LoginRequest $request) {
        $credentials = [
            'cn' => $request->get('login'),
            'password' => $request->get('password'),
        ];

        try {
            $user = User::query()
                ->where('cn', $credentials['cn'])
                ->first();

            if(!$user)
                throw new LoginFailedException('Пользователь не найден');

            $user_in_group = $user->groups()
                ->where('cn', 'FNS-web')
                ->exists();

            if(!$user_in_group)
                throw new LoginFailedException('Пользователь не состоит в группе');

            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();

                return redirect()->intended(route('welcome'));
            }
            else
                throw new LoginFailedException;
        }
        catch (LoginFailedException $e) {
            return back()->withErrors([
                'login' => $e->getMessage(),
            ])->onlyInput('login');
        }
    }

    public function logout() {
        Auth::logout();

        return redirect(route('login'));
    }
}
