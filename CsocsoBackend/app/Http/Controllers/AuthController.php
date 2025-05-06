<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Exception;
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

            return ["id" => $user["id"], "contest_admin" => $user["contest_admin"]];
        } catch (ValidationException $err) {
            return response()->json(['errors' => $err->errors()], 422);
        }
    }

    public function logIn(Request $request)
    {
        try {
            $user = UserModel::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Helytelen jelszó vagy email'], 401);
            }

            return response()->json(["id" => $user["id"], "contest_admin" => $user["contest_admin"]], 200);
        } catch (Exception $err) {
            return response()->json(['errors' => $err->getMessage()], 500);
        }
    }
}
