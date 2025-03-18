<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DirectorController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\RequestExportController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth'])->group(function () {
    Route::get('/', [RequestController::class, 'index'])->name('welcome');
    Route::get('/logout', [AuthController::class, 'logout'])->name('login.logout');

    Route::resource('director', DirectorController::class);
    Route::resource('organization', OrganizationController::class);

    Route::resource('user', UserController::class)
        ->middleware(['hasRole:admin']);

    Route::resource('request', RequestController::class);
    Route::get('/request/{request}/xml', [RequestExportController::class, 'xml'])->name('request.xml');
    Route::get('/request/{request}/excel', [RequestExportController::class, 'excel'])->name('request.excel');
    Route::post('/request/{request}/send_history', [RequestController::class, 'sendHistory'])->name('request.send-history');

    Route::resource('comments', CommentController::class);
});

Route::middleware(['guest'])->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login/handle', [AuthController::class, 'handle'])->name('login.handle');
});
