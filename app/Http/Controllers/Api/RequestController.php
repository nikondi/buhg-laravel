<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\RequestCreateRequest;
use App\Models\RequestModel;

class RequestController extends Controller
{
    public function store(RequestCreateRequest $request)
    {
        RequestModel::create($request->validated());
        return response()->json([
            'success' => true,
        ]);
    }
}
