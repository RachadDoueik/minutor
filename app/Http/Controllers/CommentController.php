<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Meeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * List comments for a meeting.
     */
    public function index(Request $request, $meetingId)
    {
        $meeting = Meeting::findOrFail($meetingId);
        $comments = $meeting->comments()->with('user')->orderBy('created_at', 'asc')->get();
        return response()->json($comments);
    }

    /**
     * Create a comment for a meeting.
     */
    public function store(Request $request, $meetingId)
    {
        $meeting = Meeting::findOrFail($meetingId);

        $request->validate([
            'text' => 'required|string'
        ]);

        $comment = Comment::create([
            'user_id' => Auth::id(),
            'meeting_id' => $meeting->id,
            'text' => $request->text,
        ]);

        return response()->json($comment->load('user'), 201);
    }

    /**
     * Delete a comment (author or admin only).
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $user = Auth::user();
        if ($comment->user_id !== $user->id && !$user->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $comment->delete();
        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
