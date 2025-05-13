<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class NewsModel extends Model
{
    use HasFactory;

    protected $table = 'news';

    protected $fillable = ['imagepath', 'title', 'content'];

    protected $casts = [
        'content' => 'string',
    ];
    
    public $timestamps = false;


}