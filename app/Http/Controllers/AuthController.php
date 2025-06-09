<?php

namespace App\Http\Controllers;

use App\Auth\HandlerInterface;
use App\DTO\LoginDTO;
use App\Exceptions\LoginFailedException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Throwable;

class AuthController extends Controller
{
    public function login()
    {
        return page()
            ->title('Авторизация')
            ->render('Auth/Login');
    }

    public function handle(LoginDTO $loginDTO, Request $request) {
        try {
            if (app(HandlerInterface::class)->handle($loginDTO)) {
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
        catch (Throwable $e) {
            Log::error(sprintf("Error during login: %s in %s:%d", $e->getMessage(), $e->getFile(), $e->getLine()));
            return back()->withErrors([
                'login' => 'Произошла ошибка. Попробуйте позже',
            ])->onlyInput('login');
        }
    }

    public function logout() {
        Auth::logout();

        return redirect(route('login'));
    }
}
