<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RoomController extends Controller
{
    /**
     * Display a listing of rooms
     */
    public function index()
    {
        $rooms = Room::with('features')->get();
        
        return response()->json($rooms);
    }

    /**
     * Store a newly created room
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'is_taken' => 'sometimes|boolean',
            'features' => 'nullable|array',
        ]);

        $room = Room::create($request->only(['name', 'location', 'capacity','is_taken']));

        // Attach features if provided
        if ($request->has('features')) {
            $room->features()->attach($request->features);
        }

        return response()->json($room->load('features'), 201);
    }

    /**
     * Display the specified room
     */
    public function show($id)
    {
        $room = Room::with(['features', 'meetings'])->findOrFail($id);
        
        return response()->json($room);
    }

    /**
     * Update the specified room
     */
    public function update(Request $request, $id)
    {
        $room = Room::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'capacity' => 'sometimes|required|integer|min:1',
            'features' => 'nullable|array',
        ]);

        $room->update($request->only(['name', 'location', 'capacity', 'is_taken']));

        // Sync features if provided
        if ($request->has('features')) {
            $room->features()->sync($request->features);
        }

        return response()->json($room->load('features'));
    }

    /**
     * Remove the specified room
     */
    public function destroy($id)
    {
        $room = Room::findOrFail($id);
        
        // Check if room has any meetings
        if ($room->meetings()->exists()) {
            throw ValidationException::withMessages([
                'room' => ['Cannot delete room that has associated meetings.']
            ]);
        }

        $room->delete();

        return response()->json([
            'message' => 'Room deleted successfully'
        ]);
    }

    /**
     * Get available rooms for a specific date/time
     */
    public function available(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $availableRooms = Room::whereDoesntHave('meetings', function ($query) use ($request) {
            $query->where('date', $request->date)
                  ->where(function ($q) use ($request) {
                      $q->whereBetween('start_time', [$request->start_time, $request->end_time])
                        ->orWhereBetween('end_time', [$request->start_time, $request->end_time])
                        ->orWhere(function ($subQ) use ($request) {
                            $subQ->where('start_time', '<=', $request->start_time)
                                 ->where('end_time', '>=', $request->end_time);
                        });
                  })
                  ->where('status', '!=', 'cancelled');
        })->with('features')->get();

        return response()->json($availableRooms);
    }
}
