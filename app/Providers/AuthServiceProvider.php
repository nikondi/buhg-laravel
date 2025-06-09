<?php

namespace App\Providers;

use App\Auth\EloquentAuth;
use App\Auth\HandlerInterface;
use App\Auth\LdapAuth;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(HandlerInterface::class, function () {
            return match (config('auth.guards.web.provider')) {
                'ldap' => new LdapAuth(),
                default => new EloquentAuth()
            };
        });
    }

    public function boot(): void
    {
    }
}
