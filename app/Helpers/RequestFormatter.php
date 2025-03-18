<?php

namespace App\Helpers;

use App\Enums\DocumentType;
use App\Enums\EducationType;
use App\Enums\PickupType;
use App\Enums\RequestStatus;
use Carbon\Carbon;

class RequestFormatter
{
    public static function formatValue($key, $value)
    {
        return match ($key) {
            'status' => (($value instanceof RequestStatus)?$value:RequestStatus::from($value))->label(),
            'education_type' => (($value instanceof EducationType)?$value:EducationType::from($value))->label(),
            'pickup_type' => (($value instanceof PickupType)?$value:PickupType::from($value))->label(),

            'birthdate', 'student_birthdate',
            'doc_date', 'student_doc_date',
            'contract_date' => (new Carbon($value))->format('d.m.Y'),

            'doc_type', 'student_doc_type' => (($value instanceof DocumentType)?$value:DocumentType::from($value))->label(),

            'contract_cost' => number_format($value, 2, '.', ' ').'р.',

            'same_student' => $value?'Да':'Нет',
            'phone', 'student_phone' => '+7'.$value,

            default => $value,
        };
    }
}
