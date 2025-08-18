<?php

namespace App\Http\Controllers;

use App\Models\ActionItem;
use App\Models\MomEntry;
use App\Models\Meeting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ActionItemController extends Controller
{
    /**
     * List action items with optional filters: meeting_id, mom_entry_id, status, assigned_to.
     */
    public function index(Request $request)
    {
        $query = ActionItem::with(['momEntry.meeting', 'assignee']);

        if ($request->filled('meeting_id')) {
            $query->whereHas('momEntry', function ($q) use ($request) {
                $q->where('meeting_id', $request->meeting_id);
            });
        }

        if ($request->filled('mom_entry_id')) {
            $query->where('mom_entry_id', $request->mom_entry_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        $items = $query->orderByDesc('id')->get();
        return response()->json($items);
    }

    /**
     * Create an action item linked to a provided MoM entry.
     * - mom_entry_id must belong to the meeting where the user is the scheduler or an admin.
     * - If assigned_to is null, it is considered "for everyone" (stored as NULL).
     */
    public function store(Request $request)
    {
        $request->validate([
            'mom_entry_id' => 'required|exists:mom_entries,id',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'nullable|date',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'nullable|in:open,in_progress,completed,cancelled',
            'file_path' => 'nullable|string',
        ]);
        $user = Auth::user();

        // Load target MoM entry and its meeting
        $mom = MomEntry::with('meeting')->findOrFail($request->mom_entry_id);
        $meeting = $mom->meeting;

        // Permission: only meeting scheduler or admin can create action items here
        if ($meeting && (int) $meeting->scheduled_by !== (int) $user->id && !$user->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $item = ActionItem::create([
            'mom_entry_id' => $mom->id,
            'type' => $request->type,
            'description' => $request->description,
            'due_date' => $request->input('due_date'),
            'assigned_to' => $request->input('assigned_to'), // null => Everyone
            'status' => $request->input('status', 'open'),
            'file_path' => $request->input('file_path'),
        ]);

        return response()->json($item->load(['momEntry.meeting', 'assignee']), 201);
    }

    /**
     * Show a single action item
     */
    public function show($id)
    {
        $item = ActionItem::with(['momEntry.meeting', 'assignee'])->findOrFail($id);
        return response()->json($item);
    }

    /**
     * Update an action item (owner scheduler/admin check).
     */
    public function update(Request $request, $id)
    {
        $item = ActionItem::with('momEntry.meeting')->findOrFail($id);

        $meeting = $item->momEntry?->meeting;

        $request->validate([
            'type' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'due_date' => 'sometimes|nullable|date',
            'assigned_to' => 'sometimes|nullable|exists:users,id',
            'status' => 'sometimes|in:open,in_progress,completed,cancelled',
            'file_path' => 'sometimes|nullable|string',
        ]);

        $item->update($request->only(['type', 'description', 'due_date', 'assigned_to', 'status', 'file_path']));
        return response()->json($item->load(['momEntry.meeting', 'assignee']));
    }

    /**
     * Delete an action item (owner scheduler/admin check).
     */
    public function destroy($id)
    {
        $item = ActionItem::with('momEntry.meeting')->findOrFail($id);
        $meeting = $item->momEntry?->meeting;
        if ($meeting && $meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $item->delete();
        return response()->json(['message' => 'Action item deleted successfully']);
    }

    /**
     * Update only the status.
     */
    public function updateStatus(Request $request, $id)
    {
        $item = ActionItem::with('momEntry.meeting')->findOrFail($id);
        $meeting = $item->momEntry?->meeting;
        if ($meeting && $meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate(['status' => 'required|in:open,in_progress,completed,cancelled']);
        $item->update(['status' => $request->status]);
        return response()->json($item->refresh()->load(['momEntry.meeting', 'assignee']));
    }

    /**
     * Assign or reassign an action item to a user.
     */
    public function assign(Request $request, $id)
    {
        $item = ActionItem::with('momEntry.meeting')->findOrFail($id);
        $meeting = $item->momEntry?->meeting;
        if ($meeting && $meeting->scheduled_by !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate(['assigned_to' => 'required|exists:users,id']);
        $item->update(['assigned_to' => $request->assigned_to]);
        return response()->json($item->refresh()->load(['momEntry.meeting', 'assignee']));
    }
}
