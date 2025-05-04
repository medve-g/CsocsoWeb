<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class UserModel extends Authenticatable
{
    use Notifiable;
    
    protected $table = "user";

    protected $fillable = ["username", "email", "password", "contest_admin"];

    public $timestamps = false;
}
