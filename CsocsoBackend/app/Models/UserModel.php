<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class UserModel extends Authenticatable
{
    protected $table = "user";

    protected $fillable = ["username", "email", "password", "contest_admin"];

    public $timestamps = false;
}
