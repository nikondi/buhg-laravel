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
            'status' => $this->status,

            'name' => $this->name,
            'surname' => $this->surname,
            'lastname' => $this->lastname,
            'phone' => $this->phone,
            'inn' => $this->inn,

            'report_year' => $this->report_year,
            'contract_cost' => $this->contract_number,
            'contract_number' => $this->contract_number,
            'contract_date' => $this->contract_date->format('d.m.Y'),
        ];
    }
}
