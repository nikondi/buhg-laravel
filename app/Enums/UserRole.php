<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case MANAGER = 'manager';

    public function getLabel(): string
    {
        return match ($this) {
            self::MANAGER => 'Менеджер',
            self::ADMIN => 'Администратор',
        };
    }
}
