<?php

namespace App\Enums;

enum PickupType: string
{
    case SEND = 'send';
    case PICKUP = 'pickup';

    public function label(): string {
        return match ($this) {
            self::SEND => 'Отправить в налоговый орган',
            self::PICKUP => 'Получить лично',
        };
    }
}
