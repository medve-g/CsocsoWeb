<?php

use App\Http\Controllers\ContestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/contests", [ContestController::class, "index"]);
