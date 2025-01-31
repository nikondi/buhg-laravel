<?php

namespace App\Enums;

enum RequestStatus: string
{
    case NEW = 'new';
    case IN_WORK = 'in_work';
    case DOWNLOADED_XML = 'downloaded_xml';
    case DECLINED = 'declined';
    case DUPLICATE = 'duplicate';

    public function label(): string {
        return match ($this) {
            self::NEW => 'Новая',
            self::IN_WORK => 'В работе',
            self::DOWNLOADED_XML => 'Выгружен XML',
            self::DECLINED => 'Отклонена',
            self::DUPLICATE => 'Дубль'
        };
    }
}
