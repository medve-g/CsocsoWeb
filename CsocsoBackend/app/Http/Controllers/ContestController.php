<?php

namespace App\Http\Controllers;

use App\Models\ContestModel;
use Illuminate\Http\Request;

class ContestController extends Controller
{
    public function index()
    {
        $contests = ContestModel::all();
        return response()->json($contests, 200, ["Content-Type" => "application/json"]);
    }
}
