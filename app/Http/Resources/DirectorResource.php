<?php

namespace App\Http\Resources;

use App\Models\Director;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Director */
class DirectorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'name' => $this->name,
            'surname' => $this->surname,
            'lastname' => $this->lastname,
            'document' => $this->document,
        ];
    }
}
