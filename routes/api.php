<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\AgendaTopicController;
use App\Http\Controllers\ActionItemController;
use App\Http\Controllers\CommentController;


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
    
    // Meeting routes (authenticated users)
    Route::get('meetings/my', [MeetingController::class, 'myMeetings']);
    Route::get('meetings/upcoming', [MeetingController::class, 'upcoming']);
    Route::get('meetings/past', [MeetingController::class, 'past']);
    Route::post('meetings/{id}/join', [MeetingController::class, 'joinMeeting']);
    Route::post('meetings/{id}/leave', [MeetingController::class, 'leaveMeeting']);
    Route::post('meetings/{id}/attendees', [MeetingController::class, 'addAttendees']);
    Route::delete('meetings/{id}/attendees', [MeetingController::class, 'removeAttendees']);
    Route::patch('meetings/{id}/status', [MeetingController::class, 'updateStatus']);
    Route::post('meetings/{id}/attendee', [MeetingController::class, 'addAttendeeRecord']);
    Route::apiResource('meetings', MeetingController::class);
    Route::apiResource('users', UserController::class);

        
    // Agenda routes (authenticated users)
    Route::get('meetings/{meetingId}/agenda', [AgendaController::class, 'getByMeeting']);
    Route::post('meetings/{meetingId}/agenda', [AgendaController::class, 'createOrUpdate']);
    Route::apiResource('agendas', AgendaController::class);
    
    // Agenda Topic routes (authenticated users)
    Route::get('agenda-topics/my', [AgendaTopicController::class, 'myTopics']);
    Route::get('agendas/{agendaId}/topics', [AgendaTopicController::class, 'getByAgenda']);
    Route::post('agendas/{agendaId}/topics', [AgendaTopicController::class, 'storeForAgenda']);
    Route::post('agendas/{agendaId}/topics/reorder', [AgendaTopicController::class, 'reorder']);
    Route::patch('agenda-topics/{id}/assign', [AgendaTopicController::class, 'assignOwner']);
    Route::get('agenda-topics/{id}', [AgendaTopicController::class, 'show']);
    Route::put('agenda-topics/{id}', [AgendaTopicController::class, 'update']);
    Route::delete('agenda-topics/{id}', [AgendaTopicController::class, 'destroy']);

    // Action Items routes
    Route::apiResource('action-items', ActionItemController::class);
    Route::patch('action-items/{id}/status', [ActionItemController::class, 'updateStatus']);
    Route::patch('action-items/{id}/assign', [ActionItemController::class, 'assign']);

    
    // Comments routes
    Route::get('meetings/{meetingId}/comments', [CommentController::class, 'index']);
    Route::post('meetings/{meetingId}/comments', [CommentController::class, 'store']);
    Route::delete('comments/{id}', [CommentController::class, 'destroy']);


    // Admin-only routes
    Route::middleware('admin')->group(function () {
        // User management
       
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
