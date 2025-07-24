<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActionItem extends Model
{
    protected $fillable = [
        'mom_entry_id',
        'assigned_to',
        'type',
        'description',
        'due_date',
        'status',
        'file_path'
    ];

    protected $casts = [
        'due_date' => 'date'
    ];

    public function momEntry()
    {
        return $this->belongsTo(MomEntry::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
