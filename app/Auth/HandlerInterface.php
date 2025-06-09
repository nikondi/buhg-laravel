<?php

namespace App\Auth;

use App\DTO\LoginDTO;
use App\Exceptions\LoginFailedException;

interface HandlerInterface {
    /**
     * @throws LoginFailedException
     */
    public function handle(LoginDTO $loginDTO): bool;
}
