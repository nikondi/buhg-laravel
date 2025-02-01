<?php

namespace App\Models;

use App\Enums\DirectorType;
use Illuminate\Database\Eloquent\Model;

class Director extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'type', 'name', 'surname', 'lastname', 'document'
    ];

    protected $casts = [
        'type' => DirectorType::class,
    ];
}
