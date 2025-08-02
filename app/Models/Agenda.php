<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $fillable = [
        'meeting_id',
    ];

    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }

    public function topics()
    {
        return $this->hasMany(AgendaTopic::class)->orderBy('order');
    }
}
