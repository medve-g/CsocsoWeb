<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContestModel extends Model
{
    protected $table = "competition";
    protected $fillable = ["id", "competition_name", "location", "competition_start", "end_of_pre-registration", "categories_and_fees"];

    public $timestamps = false;
}
