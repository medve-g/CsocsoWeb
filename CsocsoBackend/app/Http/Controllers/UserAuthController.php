<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Throwable;

class UserAuthController extends Controller
{
    public function logInUser(Request $request)
    {
        try {
            $validateRequest = Validator::make($request->all(), [
                "email" => "required|email",
                "password" => "required"
            ]);

            if ($validateRequest->fails()) {
                return response()->json([
                    "status" => false,
                    "message" => "Validation error",
                    "errors" => $validateRequest->errors()
                ], 401);
            }

            if(!Auth::attempt($request->only(["email", "password"]))){
                return response()->json([
                    "status" => false,
                    "message" => "Email and/or Password does not match with our record",
                ], 401);
            }
            
            $user = User::where("email", $request->email)->first();

            return response()->json([
                "status" => true,
                "message" => "User logged in successfully",
                "token" => $user->createToken("api_token")->plainTextToken,
                "user" => $user
            ], 200);

        } catch (Throwable $error) {
            return response()->json([
                "status" => false,
                "message" => $error->getMessage()
            ], 500);
        }
    }

    public function logOutUser(){
        
    }
}
