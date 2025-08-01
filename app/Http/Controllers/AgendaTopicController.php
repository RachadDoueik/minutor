<?php

namespace App\Http\Controllers;

use App\Models\AgendaTopic;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AgendaTopicController extends Controller
{
    /**
     * Display a listing of agenda topics
     */
    public function index(Request $request)
    {
        $query = AgendaTopic::with(['agenda.meeting', 'owner']);

        // Filter by agenda if provided
        if ($request->has('agenda_id')) {
            $query->where('agenda_id', $request->agenda_id);
        }

        $topics = $query->orderBy('order', 'asc')->get();

        return response()->json($topics);
    }

    /**
     * Store a newly created agenda topic for a specific agenda
     */
    public function storeForAgenda(Request $request, $agendaId)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'estimated_duration' => 'nullable|integer|min:1',
            'order' => 'nullable|integer|min:0',
        ]);

        // Check if user has permission to add topics to this agenda
        $agenda = Agenda::with('meeting')->findOrFail($agendaId);
        if ($agenda->meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized to add topics to this agenda'], 403);
        }

        // If no order is provided, set it to the next available order
        if (!$request->has('order')) {
            $maxOrder = AgendaTopic::where('agenda_id', $agendaId)->max('order') ?? -1;
            $order = $maxOrder + 1;
        } else {
            $order = $request->order;
        }

        $topic = AgendaTopic::create([
            'agenda_id' => $agendaId,
            'owner_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'estimated_duration' => $request->estimated_duration,
            'order' => $order,
        ]);

        return response()->json($topic->load(['agenda.meeting', 'owner']), 201);
    }

    /**
     * Display the specified agenda topic
     */
    public function show($id)
    {
        $topic = AgendaTopic::with(['agenda.meeting.scheduler', 'owner'])
                           ->findOrFail($id);

        return response()->json($topic);
    }

    /**
     * Update the specified agenda topic
     */
    public function update(Request $request, $id)
    {
        $topic = AgendaTopic::with('agenda.meeting')->findOrFail($id);

        // Check if user has permission to update this topic
        if ($topic->owner_id !== Auth::id() && 
            $topic->agenda->meeting->scheduled_by !== Auth::id() && 
            !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'estimated_duration' => 'nullable|integer|min:1',
            'order' => 'nullable|integer|min:0',
        ]);

        $topic->update($request->only(['title', 'description', 'estimated_duration', 'order']));

        return response()->json($topic->load(['agenda.meeting', 'owner']));
    }

    /**
     * Remove the specified agenda topic
     */
    public function destroy($id)
    {
        $topic = AgendaTopic::with('agenda.meeting')->findOrFail($id);

        // Check if user has permission to delete this topic
        if ($topic->owner_id !== Auth::id() && 
            $topic->agenda->meeting->scheduled_by !== Auth::id() && 
            !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $topic->delete();

        return response()->json(['message' => 'Agenda topic deleted successfully']);
    }

    /**
     * Get topics by agenda ID
     */
    public function getByAgenda($agendaId)
    {
        $agenda = Agenda::findOrFail($agendaId);
        
        $topics = AgendaTopic::with('owner')
                            ->where('agenda_id', $agendaId)
                            ->orderBy('order', 'asc')
                            ->get();

        return response()->json($topics);
    }

    /**
     * Reorder agenda topics
     */
    public function reorder(Request $request, $agendaId)
    {
        $agenda = Agenda::with('meeting')->findOrFail($agendaId);

        // Check if user has permission to reorder topics
        if ($agenda->meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'topics' => 'required|array',
            'topics.*.id' => 'required|exists:agenda_topics,id',
            'topics.*.order' => 'required|integer|min:0',
        ]);

        foreach ($request->topics as $topicData) {
            AgendaTopic::where('id', $topicData['id'])
                      ->where('agenda_id', $agendaId)
                      ->update(['order' => $topicData['order']]);
        }

        $topics = AgendaTopic::with('owner')
                            ->where('agenda_id', $agendaId)
                            ->orderBy('order', 'asc')
                            ->get();

        return response()->json([
            'message' => 'Topics reordered successfully',
            'topics' => $topics
        ]);
    }

    /**
     * Assign a topic to a different owner
     */
    public function assignOwner(Request $request, $id)
    {
        $topic = AgendaTopic::with('agenda.meeting')->findOrFail($id);

        // Check if user has permission to assign topics
        if ($topic->agenda->meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'owner_id' => 'required|exists:users,id',
        ]);

        $topic->update(['owner_id' => $request->owner_id]);

        return response()->json([
            'message' => 'Topic owner assigned successfully',
            'topic' => $topic->load(['agenda.meeting', 'owner'])
        ]);
    }

    /**
     * Get topics assigned to the authenticated user
     */
    public function myTopics()
    {
        $topics = AgendaTopic::with(['agenda.meeting.scheduler', 'agenda.meeting.room'])
                            ->where('owner_id', Auth::id())
                            ->orderBy('created_at', 'desc')
                            ->get();

        return response()->json($topics);
    }
}
