<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContestController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/contests", [ContestController::class, "index"]);

Route::post("/registerUser", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "logIn"]);

Route::get('/newsApi', [NewsController::class, 'getnews']);
Route::post('/newsApi', [NewsController::class, 'storenews']);
