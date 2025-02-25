<?php

namespace App\Http\Resources;

use App\Models\RequestModel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin RequestModel */
class RequestRowResource extends JsonResource
{
    public static $wrap = false;
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'status' => $this->status,

            'name' => $this->name,
            'surname' => $this->surname,
            'lastname' => $this->lastname,
            'phone' => $this->phone,
            'inn' => $this->inn,
            'pickup_type' => $this->pickup_type,

            'report_year' => $this->report_year,
            'contract_cost' => $this->contract_cost,
            'contract_number' => $this->contract_number,
            'contract_date' => $this->contract_date->format('d.m.Y'),
            'created_at' => $this->created_at->format('d.m.Y H:i'),
        ];
    }
}
