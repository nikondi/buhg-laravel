<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class History extends Model
{
    protected $table = 'history';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reference(): MorphTo
    {
        return $this->morphTo('reference');
    }

    protected $fillable = [
        'reference_id', 'reference_type', 'user_id', 'body', 'old_body', 'sended', 'comment'
    ];
    protected $casts = [
        'body' => 'array',
        'old_body' => 'array'
    ];
}
