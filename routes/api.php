<?php

use App\Http\Controllers\Api\RequestController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'logging'])->name('api.')->group(function () {
    Route::post('/request', [RequestController::class, 'store'])->name('request.store');
});
