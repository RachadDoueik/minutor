<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'name',
        'location',
        'capacity',
        'description'
    ];

    public function features()
    {
        return $this->belongsToMany(Feature::class);
    }

    public function meetings()
    {
        return $this->hasMany(Meeting::class);
    }
}
