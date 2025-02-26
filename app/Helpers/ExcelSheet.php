<?php

namespace App\Helpers;

use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;


/**
 * @mixin Worksheet
 **/
readonly class ExcelSheet {
    private function __construct(
        private ?Worksheet $sheet,
    )
    {
    }

    public static function from(?Worksheet $sheet): ?self
    {
        return $sheet?new self($sheet):null;
    }

    public function mappedFill($value, $map): self {
        $value = mb_str_split($value);
        foreach ($map as $key => $cell) {
            if(!isset($value[$key]))
                $value[$key] = '-';
            $this->sheet->setCellValueExplicit($cell, $value[$key], is_numeric($value[$key])?DataType::TYPE_NUMERIC:DataType::TYPE_STRING);
        }

        return $this;
    }

    public function __call(string $name, array $arguments)
    {
        $result = $this->sheet->$name(...$arguments);
        if($result instanceof Worksheet)
            return $this;
        else
            return $result;
    }
}
