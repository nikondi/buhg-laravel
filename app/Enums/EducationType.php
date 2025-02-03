<?php

namespace App\Enums;

enum EducationType: string
{
    case FULL_TIME = 'full-time';
    case PART_TIME = 'part-time';

    public function label(): string {
        return match ($this) {
            self::FULL_TIME => 'Очная',
            self::PART_TIME => 'Заочная',
        };
    }
}
