<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MomEntry extends Model
{
    protected $fillable = [
        'meeting_id',
        'title',
        'notes',
        'summary',
        'file_path'
    ];

    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }

    public function actionItems()
    {
        return $this->hasMany(ActionItem::class);
    }
}
