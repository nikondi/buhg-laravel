<?php

namespace App\Helpers;

class DocFormatter {
    public static function from(string $doc_code, string $doc_number): string
    {
        return match ($doc_code) {
            '21' => self::passport($doc_number),
            default => preg_replace("/[^0-9 ]/", '', $doc_number),
        };
    }

    public static function passport(string $doc_number): string
    {
        $doc_number = preg_replace("/\D/", '', $doc_number);
        return sprintf(
            "%s %s %s",
            substr($doc_number, 0, 2),
            substr($doc_number, 2, 2),
            substr($doc_number, 4, 6)
        );
    }
}
