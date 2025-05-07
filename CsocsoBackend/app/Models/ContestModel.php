<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContestModel extends Model
{
    protected $table = "competition";

    protected $fillable = ["id", "competition_name", "location", "competition_start", "end_of_pre_registration", "ratings_and_fees", "categories"];

    public $timestamps = false;

    protected $casts = [
        'ratings_and_fees' => 'array',  
    ];
}
