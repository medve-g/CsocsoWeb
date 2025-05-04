<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validate = $request->validate([
            "username" => "required|string",
            "email" => "required|email|unique:user",
            "password" => "required|string|min:8",
            "contest_admin" => "in:0"
        ]);

        $validate['password'] = Hash::make($validate['password']);

        $user = UserModel::create($validate);

        

        return ["id" => $user["id"], "contest_admin" => $user["contest_admin"]];
    }
}
