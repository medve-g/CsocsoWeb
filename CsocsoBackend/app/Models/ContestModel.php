<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ContestModel extends Model
{

    use HasFactory;

    protected $table = "competition";

    protected $fillable = ["id", "competition_name", "location", "competition_start", "end_of_pre_registration", "ratings_and_fees", "categories"];
    
    protected $casts = [
        'ratings_and_fees' => 'array',  
        'categories' => 'array'
    ];

    public $timestamps = false;

}
