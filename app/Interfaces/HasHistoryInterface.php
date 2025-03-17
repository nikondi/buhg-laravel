<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/* @mixin Model */
interface HasHistoryInterface
{
    public function history(): MorphMany;
}
