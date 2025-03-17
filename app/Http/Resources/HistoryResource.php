<?php

namespace App\Http\Resources;

use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin History */
class HistoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $body = [];
        foreach ($this->body as $key => $value) {
            $body[] = [
                'key' => $key,
                'old' => $this->old_body[$key] ?? 'Не известно',
                'new' => $this->body[$key]
            ];
        }

        return [
            'id' => $this->id,
            'user' => $this->user,
            'body' => $body,
            'sended' => $this->sended,
            'comment' => $this->comment,
            'created_at' => $this->created_at->format('d.m.Y H:i:s'),
        ];
    }
}
