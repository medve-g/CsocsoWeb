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
            "phonenumber" => "required|string|min:12|max:12|regex:/^\+/",
            "gender" => "required|string|min:2|max:5",
            "contest_admin" => "in:0"
        ]);

        $validate['password'] = Hash::make($validate['password']);

        $user = UserModel::create($validate);

        return response()->json([
            "id" => $user->id,
            "username" => $user->username,
            "email" => $user->email,
            "phonenumber" => $user->phonenumber,
            "gender" => $user->gender,
            "contest_admin" => $user->contest_admin
        ], 200);
    } catch (ValidationException $err) {
        return response()->json(['errors' => $err->errors()], 422);
    }
}


    public function logIn(Request $request)
{
    try {
        $user = UserModel::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Helytelen email vagy jelszó!'], 401);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            "user" => $user,
            "token" => $token
        ], 200);
    } catch (Exception $err) {
        return response()->json(['errors' => $err->getMessage()], 500);
    }
}

public function updateProfile(Request $request)
{
    try {
        $user = auth()->user();

        $validatedData = $request->validate([
            "username" => "string|max:255",
            "email" => "email|unique:user,email," . $user->id,
            "phonenumber" => "string|max:20",
            "gender" => "string|max:10"
        ]);

        $user->update($validatedData);

        return response()->json(["message" => "Profil adatainak módosítása sikeresen megtörtént!", "user" => $user], 200);
    } catch (\Exception $e) {
        \Log::error("Update profile error: " . $e->getMessage());
        return response()->json(["error" => "Hiba történt a profil adatainak módosítása során!", "details" => $e->getMessage()], 500);
    }
}
public function changePassword(Request $request)
{
    $user = auth()->user();

    $request->validate([
        'current_password' => 'required|string',
        'new_password' => 'required|string|min:8|confirmed',
    ]);

    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json(['message' => 'A jelenlegi jelszó hibás.'], 403);
    }

    $user->password = Hash::make($request->new_password);
    $user->save();

    return response()->json(['message' => 'Jelszó sikeresen megváltoztatva.'], 200);
}
}
