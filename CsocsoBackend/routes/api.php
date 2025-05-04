<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContestController;
use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/contests", [ContestController::class, "index"]);

Route::post("/registerUser", [AuthController::class, "register"]);
