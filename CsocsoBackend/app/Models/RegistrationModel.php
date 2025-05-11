<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationModel extends Model
{
   protected $table = "registration";

    protected $fillable = ["id", "registration_submitter", "categorie", "contestant1", "contestant2", "registration_fee", "competition_id"];

    public $timestamps = false;
}
