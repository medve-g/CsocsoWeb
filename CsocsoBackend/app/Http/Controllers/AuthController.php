<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validate = $request->validate([
                "username" => "required|string",
                "email" => "required|email|unique:user",
                "password" => "required|string|min:8|confirmed",
                "contest_admin" => "in:0"
            ]);

            $validate['password'] = Hash::make($validate['password']);

            $user = UserModel::create($validate);

            Auth::login($user);

            return ["id" => $user["id"], "contest_admin" => $user["contest_admin"]];
        } catch (ValidationException $err) {
            return response()->json(['errors' => $err->errors()], 422);
        }
    }

    public function logIn(Request $request)
    {
        $credentials = $request->only("email", "password");

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Helytelen jelszó vagy email cím'], 401);
        }

        return response()->json(Auth::user());
    }
}
