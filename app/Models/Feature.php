<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description'
    ];

    public function rooms()
    {
        return $this->belongsToMany(Room::class);
    }
}
