<?php

namespace App\Http\Resources;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Comment */
class CommentResource extends JsonResource
{
    public static $wrap = false;
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'text' => $this->text,

            'user' => new UserResource($this->user),
            'request_id' => $this->request_id,

            'created_at' => $this->created_at->format('d.m.Y H:i:s'),
        ];
    }
}
