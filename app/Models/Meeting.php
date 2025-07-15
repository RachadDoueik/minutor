<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
    public function mom()
    {
        return $this->hasOne(MomEntry::class);
    }
}
