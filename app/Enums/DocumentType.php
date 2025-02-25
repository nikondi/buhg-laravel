<?php

namespace App\Enums;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use JsonSerializable;

class DocumentType implements CastsAttributes, JsonSerializable
{
    public ?string $key = null;
    public ?string $value = null;
    public function label() {
        return static::$labels[$this->value] ?? $this->value;
    }

    public static function getLabels(): array
    {
        return static::$labels;
    }

    public static function from(string $doc_type): DocumentType
    {
        $instance = new self();
        $instance->value = $doc_type;
        return $instance;
    }

    private static array $labels = [
        '21' => 'Паспорт гражданина Российской Федерации',
        '27' => 'Военный билет офицера запаса',
        '24' => 'Удостоверение личности военнослужащего Российской Федерации',
        '23' => 'Свидетельство о рождении, выданное уполномоченным органом иностранного государства',
        '19' => 'Свидетельство о предоставлении временного убежища на территории Российской Федерации',
        '15' => 'Разрешение на временное проживание в Российской Федерации',
        '14' => 'Временное удостоверение личности гражданина Российской Федерации',
        '13' => 'Удостоверение беженца',
        '12' => 'Вид на жительство в Российской Федерации',
        '11' => 'Свидетельство о рассмотрении ходатайства о признании лица беженцем на территории Российской Федерации по существу',
        '10' => 'Паспорт иностранного гражданина',
        '08' => 'Временное удостоверение, выданное взамен военного билета',
        '07' => 'Военный билет',
        '03' => 'Свидетельство о рождении',
    ];

    public function get(Model $model, string $key, mixed $value, array $attributes): ?static
    {
        if($value == null)
            return null;

        $this->value = $value;
        return $this;
    }

    public function set(Model $model, string $key, mixed $value, array $attributes)
    {
        return $value;
    }

    public function __toString(): string
    {
        return $this->value;
    }

    public function jsonSerialize(): ?string
    {
        return $this->value;
    }
}
