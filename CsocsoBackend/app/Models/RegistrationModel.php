<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RegistrationModel extends Model
{
    use HasFactory;

    protected $table = "registration";

    protected $fillable = ["id", "registration_submitter", "categorie", "contestant1", "contestant2", "registration_fee", "competition_id"];

    protected $casts = [
        'contestant1' => 'array',
        'contestant2' => 'array',
    ];
}
