<?php

namespace App\Http\Controllers;

use App\Models\ContestModel;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ContestController extends Controller
{
    public function index()
    {
        $contests = ContestModel::all();
        return response()->json($contests, 200, ["Content-Type" => "application/json"]);
    }

    public function store(Request $request)
    {
        try {

            $validate = $request->validate([
                "competition_name" => "required|string",
                "location" => "required|string",
                "competition_start" => "required|date",
                "end_of_pre_registration" => "required|date",
                "ratings_and_fees" => "required",
                "categories" => "required"
            ]);

            
            $contest = ContestModel::create([
                'competition_name' => $request->competition_name,
                'location' => $request->location,
                'competition_start' => $request->competition_start,
                'end_of_pre_registration' => $request->end_of_pre_registration,
                'categories' => json_encode($request->categories), 
                'ratings_and_fees' => json_encode($request->ratings_and_fees),  
            ]);


            return response()->json([
                "message" => "Sikeres",
                "data" => $contest
            ], 200);
        } catch (ValidationException $err) {
            return response()->json(['errors' => $err->errors()], 422);
        }
    }
}
