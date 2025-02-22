<?php

namespace App\Exceptions;

use Exception;

class LoginFailedException extends Exception
{
    protected $message = 'Неудачная попытка входа';
}
