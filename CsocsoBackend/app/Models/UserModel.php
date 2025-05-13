<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserModel extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;
    
    protected $table = "user";

    protected $fillable = ["username", "email", "password","phonenumber","gender", "contest_admin"];

}
