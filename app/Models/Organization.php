<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'name', 'short_name', 'inn', 'kpp'
    ];
}
