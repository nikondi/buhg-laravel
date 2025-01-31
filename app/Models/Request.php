<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Request extends Model
{
    public $timestamps = false;

    public function director(): BelongsTo
    {
        return $this->belongsTo(Director::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    protected function casts(): array
    {
        return [
            'same_student' => 'boolean',
        ];
    }
}
