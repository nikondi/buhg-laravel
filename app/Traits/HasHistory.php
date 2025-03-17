<?php

namespace App\Traits;

use App\Models\History;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/* @mixin Model */
trait HasHistory
{
    public function history(): MorphMany
    {
        return $this->morphMany(History::class, 'reference');
    }
}
