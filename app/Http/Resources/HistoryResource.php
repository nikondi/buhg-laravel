<?php

namespace App\Http\Resources;

use App\Helpers\RequestFormatter;
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
            $old_value = isset($this->old_body[$key])?RequestFormatter::formatValue($key, $this->old_body[$key]):'Не известно';
            $value = RequestFormatter::formatValue($key, $this->body[$key]);

            $body[] = [
                'key' => trans_df('request.changed.'.$key, default: $key),
                'old' => $old_value,
                'new' => $value
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
