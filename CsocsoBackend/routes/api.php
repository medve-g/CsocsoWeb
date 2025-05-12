<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ContestController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get("/contests", [ContestController::class, "index"]);
Route::post("/newContest", [ContestController::class, "store"]) ;
Route::delete("/deleteContest/{id}", [ContestController::class, "destroy"]);

Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "logIn"]);
Route::post("/logout", [AuthController::class, "logOut"]);
Route::middleware('auth:sanctum')->put('/user/update', [AuthController::class, 'updateProfile']);
Route::middleware('auth:sanctum')->put('/user/changePassword', [AuthController::class, 'changePassword']);

Route::get('/newsApi', [NewsController::class, 'getnews']);
Route::post('/newsApi', [NewsController::class, 'storenews']);
Route::delete('/newsApi/{id}', [NewsController::class, 'deletenews']);

Route::post("/categories", [CategorieController::class, "sendRequestedCategories"]);

Route::post('/registrationSender', [RegistrationController::class, 'store']);
Route::get('/useRregistrationGetter/{id}', [RegistrationController::class, 'showUserRegistrations']);
Route::get('/registration/export', [RegistrationController::class, 'exportExcel']);