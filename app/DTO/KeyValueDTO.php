<?php

namespace App\DTO;

use Closure;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Collection;

class KeyValueDTO implements Arrayable {
    public ?string $key = null;
    public ?string $value = null;

    public function __construct($model, string $key, string|Closure $value)
    {
        $this->key = $model->$key;
        if($value instanceof Closure)
            $this->value = $value($model);
        else
            $this->value = $model->$value;
    }

    /**
     * @return Collection<KeyValueDTO>
    */
    public static function collection(iterable $models, string $key, string|Closure $value): Collection {
        $result = collect();
        foreach ($models as $model) {
            $result->push(new static($model, $key, $value));
        }
        return $result;
    }

    public function toArray(): array {
        return [
            'key' => $this->key,
            'value' => $this->value,
        ];
    }
}
