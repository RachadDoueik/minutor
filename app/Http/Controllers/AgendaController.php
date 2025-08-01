<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\Meeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AgendaController extends Controller
{
    /**
     * Display a listing of agendas
     */
    public function index(Request $request)
    {
        $query = Agenda::with(['meeting', 'topics.owner']);

        // Filter by meeting if provided
        if ($request->has('meeting_id')) {
            $query->where('meeting_id', $request->meeting_id);
        }

        $agendas = $query->orderBy('created_at', 'desc')->get();

        return response()->json($agendas);
    }

    /**
     * Store a newly created agenda
     */
    public function store(Request $request)
    {
        $request->validate([
            'meeting_id' => 'required|exists:meetings,id',
        ]);

        // Check if user has permission to create agenda for this meeting
        $meeting = Meeting::findOrFail($request->meeting_id);
        if ($meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized to create agenda for this meeting'], 403);
        }

        // Check if agenda already exists for this meeting
        $existingAgenda = Agenda::where('meeting_id', $request->meeting_id)->first();
        if ($existingAgenda) {
            return response()->json(['message' => 'Agenda already exists for this meeting'], 422);
        }

        $agenda = Agenda::create($request->only(['meeting_id']));

        return response()->json($agenda->load(['meeting', 'topics.owner']), 201);
    }

    /**
     * Display the specified agenda
     */
    public function show($id)
    {
        $agenda = Agenda::with(['meeting.scheduler', 'meeting.room', 'topics.owner'])
                       ->findOrFail($id);

        return response()->json($agenda);
    }

   
    /**
     * Remove the specified agenda
     */
    public function destroy($id)
    {
        $agenda = Agenda::findOrFail($id);

        // Check if user has permission to delete this agenda
        if ($agenda->meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $agenda->delete();

        return response()->json(['message' => 'Agenda deleted successfully']);
    }

    /**
     * Get agenda by meeting ID
     */
    public function getByMeeting($meetingId)
    {
        $meeting = Meeting::findOrFail($meetingId);
        
        $agenda = Agenda::with(['topics.owner'])
                       ->where('meeting_id', $meetingId)
                       ->first();

        if (!$agenda) {
            return response()->json(['message' => 'No agenda found for this meeting'], 404);
        }

        return response()->json($agenda);
    }

    /**
     * Create or update agenda for a meeting
     */
    public function createOrUpdate(Request $request, $meetingId)
    {
        $meeting = Meeting::findOrFail($meetingId);

        // Check if user has permission
        if ($meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $agenda = Agenda::updateOrCreate(
            ['meeting_id' => $meetingId],
            [
                'title' => $request->title,
                'description' => $request->description,
            ]
        );

        return response()->json($agenda->load(['meeting', 'topics.owner']));
    }
}
