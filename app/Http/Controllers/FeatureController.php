<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FeatureController extends Controller
{
    /**
     * Display a listing of features
     */
    public function index()
    {
        $features = Feature::with('rooms')->get();
        
        return response()->json($features);
    }

    /**
     * Store a newly created feature
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:features,name',
        ]);

        $feature = Feature::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return response()->json($feature, 201);
    }

    /**
     * Display the specified feature
     */
    public function show($id)
    {
        $feature = Feature::with('rooms')->findOrFail($id);
        
        return response()->json($feature);
    }
  
    /**
     * Remove the specified feature
     */
    public function destroy($id)
    {
        $feature = Feature::findOrFail($id);
        
        // Detach from all rooms before deleting
        $feature->rooms()->detach();
        $feature->delete();

        return response()->json([
            'message' => 'Feature deleted successfully'
        ]);
    }

    /**
     * Attach feature to room
     */
    public function attachToRoom(Request $request, $id)
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id'
        ]);

        $feature = Feature::findOrFail($id);
        $feature->rooms()->syncWithoutDetaching([$request->room_id]);

        return response()->json([
            'message' => 'Feature attached to room successfully'
        ]);
    }

    /**
     * Detach feature from room
     */
    public function detachFromRoom(Request $request, $id)
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id'
        ]);

        $feature = Feature::findOrFail($id);
        $feature->rooms()->detach($request->room_id);

        return response()->json([
            'message' => 'Feature detached from room successfully'
        ]);
    }
}
