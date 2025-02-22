<?php

namespace App\Ldap;

use Illuminate\Contracts\Auth\Authenticatable;
use LdapRecord\Models\ActiveDirectory\Group;
use LdapRecord\Models\Concerns\CanAuthenticate;
use LdapRecord\Models\Model;
use LdapRecord\Models\Relations\HasMany;

class User extends Model implements Authenticatable
{
    use CanAuthenticate;
    /**
     * The object classes of the LDAP model.
     */
    public static array $objectClasses = [
        'user'
    ];

    protected string $guidKey = 'objectGUID';

    /**
     * Retrieve the groups the user is apart of.
     */
    public function groups(): HasMany
    {
        return $this->hasMany(Group::class, 'member');
    }
}
