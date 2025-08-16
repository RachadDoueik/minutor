<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\MomEntry;
use App\Models\User;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;

class MeetingController extends Controller
{
    /**
     * Display a listing of meetings with optional filters
     */
    public function index(Request $request)
    {
        $query = Meeting::with(['scheduler', 'room', 'attendees', 'agenda']);

        // Apply filters
        if ($request->has('date')) {
            $query->where('date', $request->date);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('room_id')) {
            $query->where('room_id', $request->room_id);
        }

        if ($request->has('from_date') && $request->has('to_date')) {
            $query->whereBetween('date', [$request->from_date, $request->to_date]);
        }

        $meetings = $query->orderBy('date', 'asc')
                         ->orderBy('start_time', 'asc')
                         ->get();

        return response()->json($meetings);
    }

    /**
     * Store a newly created meeting
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'objective' => 'nullable|string',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'room_id' => 'required|exists:rooms,id',
            'attendees' => 'nullable|array',
            'attendees.*' => 'exists:users,id'
        ]);

        // Check if room is available at the specified time
        $conflictingMeetings = Meeting::where('room_id', $request->room_id)
            ->where('date', $request->date)
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                      ->orWhereBetween('end_time', [$request->start_time, $request->end_time])
                      ->orWhere(function ($subQuery) use ($request) {
                          $subQuery->where('start_time', '<=', $request->start_time)
                                   ->where('end_time', '>=', $request->end_time);
                      });
            })
            ->exists();

        if ($conflictingMeetings) {
            return response()->json([
                'message' => 'Room is not available at the specified time'
            ], 422);
        }

        $meeting = Meeting::create([
            'title' => $request->title,
            'objective' => $request->objective,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'status' => 'scheduled',
            'scheduled_by' => Auth::id(),
            'room_id' => $request->room_id,
        ]);

        
        Agenda::create([
            'meeting_id' => $meeting->id
        ]);

        // Create an empty MoM entry for this meeting
        MomEntry::create([
            'meeting_id' => $meeting->id,
            'title' => 'Meeting Minutes',
            'notes' => '',
            'summary' => null,
            'file_path' => null,
        ]);

        // Add attendees if provided
        if ($request->has('attendees')) {
            $meeting->attendees()->attach($request->attendees, [
                'status' => 'invited',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        return response()->json($meeting->load(['scheduler', 'room', 'attendees', 'agenda']), 201);
    }

    /**
     * Display the specified meeting
     */
    public function show($id)
    {
        $meeting = Meeting::with(['scheduler', 'room', 'attendees', 'agenda', 'momEntries'])
                          ->findOrFail($id);

        return response()->json($meeting);
    }

    /**
     * Update the specified meeting
     */
    public function update(Request $request, $id)
    {
        $meeting = Meeting::findOrFail($id);

        // Check if user has permission to update this meeting
        if ($meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'objective' => 'nullable|string',
            'date' => 'sometimes|required|date',
            'start_time' => 'sometimes|required|date_format:H:i',
            'end_time' => 'sometimes|required|date_format:H:i|after:start_time',
            'room_id' => 'sometimes|required|exists:rooms,id',
            'status' => 'sometimes|required|in:scheduled,in_progress,completed,cancelled',
        ]);

        // Check room availability if date, time, or room is being changed
        if ($request->has('date') || $request->has('start_time') || $request->has('end_time') || $request->has('room_id')) {
            $date = $request->get('date', $meeting->date);
            $startTime = $request->get('start_time', $meeting->start_time);
            $endTime = $request->get('end_time', $meeting->end_time);
            $roomId = $request->get('room_id', $meeting->room_id);

            $conflictingMeetings = Meeting::where('room_id', $roomId)
                ->where('date', $date)
                ->where('status', '!=', 'cancelled')
                ->where('id', '!=', $meeting->id)
                ->where(function ($query) use ($startTime, $endTime) {
                    $query->whereBetween('start_time', [$startTime, $endTime])
                          ->orWhereBetween('end_time', [$startTime, $endTime])
                          ->orWhere(function ($subQuery) use ($startTime, $endTime) {
                              $subQuery->where('start_time', '<=', $startTime)
                                       ->where('end_time', '>=', $endTime);
                          });
                })
                ->exists();

            if ($conflictingMeetings) {
                return response()->json([
                    'message' => 'Room is not available at the specified time'
                ], 422);
            }
        }

        $meeting->update($request->only([
            'title', 'objective', 'date', 'start_time', 'end_time', 'room_id', 'status'
        ]));

        return response()->json($meeting->load(['scheduler', 'room', 'attendees', 'agenda']));
    }

    /**
     * Remove the specified meeting
     */
    public function destroy($id)
    {
        $meeting = Meeting::findOrFail($id);

        // Check if user has permission to delete this meeting
        if ($meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $meeting->delete();

        return response()->json(['message' => 'Meeting deleted successfully']);
    }

    /**
     * Get meetings for the authenticated user
     */
    public function myMeetings(Request $request)
    {
        $user = Auth::user();
        
        $query = Meeting::with(['scheduler', 'room', 'attendees', 'agenda'])
            ->where(function ($query) use ($user) {
                $query->where('scheduled_by', $user->id)
                      ->orWhereHas('attendees', function ($subQuery) use ($user) {
                          $subQuery->where('user_id', $user->id);
                      });
            });

        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('from_date') && $request->has('to_date')) {
            $query->whereBetween('date', [$request->from_date, $request->to_date]);
        }

        $meetings = $query->orderBy('date', 'asc')
                         ->orderBy('start_time', 'asc')
                         ->get();

        return response()->json($meetings);
    }

    /**
     * Add attendees to a meeting
     */
    public function addAttendees(Request $request, $id)
    {
        $meeting = Meeting::findOrFail($id);

        // Check if user has permission to modify attendees
        if ($meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'attendees' => 'required|array',
            'attendees.*' => 'exists:users,id',
        ]);

        // Get current attendee IDs to avoid duplicates
        $currentAttendees = $meeting->attendees()->pluck('user_id')->toArray();
        $newAttendees = array_diff($request->attendees, $currentAttendees);

        if (!empty($newAttendees)) {
            $attendeeData = [];
            foreach ($newAttendees as $userId) {
                $attendeeData[$userId] = [
                    'status' => 'invited',
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }
            $meeting->attendees()->attach($attendeeData);
        }

        return response()->json([
            'message' => 'Attendees added successfully',
            'meeting' => $meeting->load(['scheduler', 'room', 'attendees', 'agenda'])
        ]);
    }  

    /**
     * Remove attendees from a meeting
     */
    public function removeAttendees(Request $request, $id)
    {
        $meeting = Meeting::findOrFail($id);

        // Check if user has permission to modify attendees
        if ($meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'attendees' => 'required|array',
            'attendees.*' => 'exists:users,id',
        ]);

        $meeting->attendees()->detach($request->attendees);

        return response()->json([
            'message' => 'Attendees removed successfully',
            'meeting' => $meeting->load(['scheduler', 'room', 'attendees', 'agenda'])
        ]);
    }

    /**
     * Update meeting status
     */
    public function updateStatus(Request $request, $id)
    {
        $meeting = Meeting::findOrFail($id);

        // Check if user has permission to update status
        if ($meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'status' => 'required|in:scheduled,in_progress,completed,cancelled',
        ]);

        $meeting->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Meeting status updated successfully',
            'meeting' => $meeting->load(['scheduler', 'room', 'attendees', 'agenda'])
        ]);
    }

    /**
     * Get upcoming meetings for the authenticated user
     */
    public function upcoming()
    {
        $user = Auth::user();
        $now = now();

        $meetings = Meeting::with(['scheduler', 'room', 'attendees', 'agenda'])
            ->where(function ($query) use ($user) {
                $query->where('scheduled_by', $user->id)
                      ->orWhereHas('attendees', function ($subQuery) use ($user) {
                          $subQuery->where('user_id', $user->id);
                      });
            })
            ->where('status', 'scheduled')
            ->where(function ($query) use ($now) {
                $query->where('date', '>', $now->toDateString())
                      ->orWhere(function ($subQuery) use ($now) {
                          $subQuery->where('date', $now->toDateString())
                                   ->where('start_time', '>', $now->format('H:i'));
                      });
            })
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        return response()->json($meetings);
    }

    /**
     * Get past meetings for the authenticated user
     */
    public function past()
    {
        $user = Auth::user();
        $now = now();

        $meetings = Meeting::with(['scheduler', 'room', 'attendees', 'agenda'])
            ->where(function ($query) use ($user) {
                $query->where('scheduled_by', $user->id)
                      ->orWhereHas('attendees', function ($subQuery) use ($user) {
                          $subQuery->where('user_id', $user->id);
                      });
            })
            ->where(function ($query) use ($now) {
                $query->whereIn('status', ['completed', 'cancelled'])
                      ->orWhere(function ($subQuery) use ($now) {
                          $subQuery->where('date', '<', $now->toDateString())
                                   ->orWhere(function ($timeQuery) use ($now) {
                                       $timeQuery->where('date', $now->toDateString())
                                                ->where('end_time', '<', $now->format('H:i'));
                                   });
                      });
            })
            ->orderBy('date', 'desc')
            ->orderBy('start_time', 'desc')
            ->get();

        return response()->json($meetings);
    }

    /**
     * Join a meeting: mark the authenticated user's attendee status as accepted.
     */
    public function joinMeeting($id)
    {
        $meeting = Meeting::findOrFail($id);
        $userId = Auth::id();

        // Upsert pivot: accepted + timestamps
        $meeting->attendees()->syncWithoutDetaching([
            $userId => [
                'status' => 'accepted',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        return response()->json(['message' => 'Joined meeting successfully']);
    }

    /**
     * Leave a meeting: mark the authenticated user's attendee status as invited.
     */
    public function leaveMeeting($id)
    {
        $meeting = Meeting::findOrFail($id);
        $userId = Auth::id();

        // Upsert pivot: invited + timestamps
        $meeting->attendees()->syncWithoutDetaching([
            $userId => [
                'status' => 'invited',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        return response()->json(['message' => 'Left meeting successfully']);
    }
}
