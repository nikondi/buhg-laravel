<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DirectorController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/', WelcomeController::class)->name('welcome');
    Route::get('/logout', [AuthController::class, 'logout'])->name('login.logout');

    Route::resource('director', DirectorController::class);
    Route::resource('organization', OrganizationController::class);
});

Route::middleware(['guest'])->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login/handle', [AuthController::class, 'handle'])->name('login.handle');
});
