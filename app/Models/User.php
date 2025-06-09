<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\DTO\CreateUserDTO;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Arr;
use Laravel\Sanctum\HasApiTokens;
use LdapRecord\Laravel\Auth\AuthenticatesWithLdap;
use LdapRecord\Laravel\Auth\LdapAuthenticatable;

/**
 * @property UserRole $role
 * */
class User extends Authenticatable implements LdapAuthenticatable
{
    use Notifiable,
        HasApiTokens,
        AuthenticatesWithLdap;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'login',
        'email',
        'password',
        'guid',
        'role',
    ];

    /**
     * @param UserRole|string|UserRole[]|string[] $role
     * @return bool
     */
    public function hasRole(UserRole|string|array $role): bool
    {
        $role = array_map(fn($r) => ($r instanceof UserRole)?($r->value):$r, Arr::wrap($role));

        return in_array($this->role->value, $role);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'user_id');
    }

    public static function make(CreateUserDTO $createUserDTO): User
    {
        return new static($createUserDTO->only('email', 'name', 'login', 'password', 'role')->toArray());
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'role' => UserRole::class,
        ];
    }
}
