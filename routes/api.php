<?php

use App\Http\Controllers\Api\RequestController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/request', [RequestController::class, 'store']);
});
