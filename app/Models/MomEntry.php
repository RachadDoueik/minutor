<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ActionItem;

class MomEntry extends Model
{
    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }
    public function actions()
    {
        return $this->hasMany(ActionItem::class);
    }

}
