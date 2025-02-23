<?php

namespace App\Enums;

enum RequestStatus: string
{
    case NEW = 'new';
    case IN_WORK = 'in_work';
    case DOWNLOADED_XML = 'downloaded_xml';
    case DONE = 'done';
    case READY_PICKUP = 'ready_pickup';
    case DECLINED = 'declined';
    case DUPLICATE = 'duplicate';

    public function label(): string {
        return match ($this) {
            self::NEW => 'Новая',
            self::IN_WORK => 'В работе',
            self::DOWNLOADED_XML => 'Отправлена в налоговый орган',
            self::READY_PICKUP => 'Готова к получению',
            self::DECLINED => 'Отклонена',
            self::DUPLICATE => 'Дубль',
            self::DONE => 'Выдана',
            default => $this->value
        };
    }

    public function shortLabel(): string {
        return match ($this) {
            self::DOWNLOADED_XML => 'Отправлена',
            default => $this->label(),
        };
    }
}
