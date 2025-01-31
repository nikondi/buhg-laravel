<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login()
    {
        return page()
            ->title('Авторизация')
            ->render('Auth/Login');
    }

    public function handle(Request $request) {
        $credentials = $request->validate([
            'login' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended(route('welcome'));
        }

        return back()->withErrors([
            'login' => 'Неудачная попытка входа',
        ])->onlyInput('login');
    }

    public function logout() {
        Auth::logout();

        return redirect(route('login'));
    }
}
