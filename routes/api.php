<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\FeatureController;

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
    
    // Room and Feature routes (authenticated users can view)
    Route::apiResource('rooms', RoomController::class)->only(['index', 'show']);
    Route::apiResource('features', FeatureController::class)->only(['index', 'show']);
    Route::get('rooms/available', [RoomController::class, 'available']);
    
    // Admin-only routes
    Route::middleware('admin')->group(function () {
        // User management
        Route::apiResource('users', UserController::class);
        Route::put('users/{id}/lock', [UserController::class, 'lockUser']);
        Route::put('users/{id}/unlock', [UserController::class, 'unlockUser']);
        
        // Room management
        Route::apiResource('rooms', RoomController::class)->except(['index', 'show']);
        
        // Feature management
        Route::apiResource('features', FeatureController::class)->except(['index', 'show']);
        Route::post('features/{id}/attach-room', [FeatureController::class, 'attachToRoom']);
        Route::post('features/{id}/detach-room', [FeatureController::class, 'detachFromRoom']);
    });
});
