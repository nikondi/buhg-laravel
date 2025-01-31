<?php

namespace App\Enums;

enum DirectorType: int
{
    case LEADER = 1;
    case AGENT = 2;

    public function label(): string {
        return match ($this) {
            self::LEADER => 'Руководитель организации',
            self::AGENT => 'Представитель организации'
        };
    }
}
