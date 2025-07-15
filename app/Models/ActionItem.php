<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActionItem extends Model
{
    public function momEntry()
    {
        return $this->belongsTo(MomEntry::class);
    }
    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

}
