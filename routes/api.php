<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

// Authentication routes (no middleware required)
Route::post('auth/login', [AuthController::class, 'login']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    
    // User profile routes (any authenticated user)
    Route::get('/profile', [UserController::class, 'profile']);
    Route::put('/profile', [UserController::class, 'updateProfile']);
    Route::put('/profile/password', [UserController::class, 'updatePassword']);
    
    // Admin-only routes (user management)
    Route::middleware('admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::put('users/{id}/lock', [UserController::class, 'lockUser']);
        Route::put('users/{id}/unlock', [UserController::class, 'unlockUser']);
    });
});
