<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryModel extends Model
{
    protected $table = "categories";

    protected $fillable = ["id", "name", "ranklist_reference", "type"];

    public $timestamps = false;
}
