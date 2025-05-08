<?php

namespace App\Http\Controllers;

use App\Models\ContestModel;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

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
            $request->validate([
                'competition_name' => 'required|string',
                'location' => 'required|string',
                'competition_start' => 'required|date',
                'end_of_pre_registration' => 'required|date',
                'categories' => 'required',
                'ratings_and_fees' => 'required',
            ]);

            $ratingsAndFees = $request->input('ratings_and_fees');
            $categories = $request->input("categories");

            $categoriesAssoc = [];

            foreach ($categories as $key => $value) {
                $categoriesAssoc[$key] = $value;
            }

            DB::table("competition")->insert([
                "competition_name" => $request["competition_name"],
                "location" => $request["location"],
                "competition_start" => $request["competition_start"],
                "end_of_pre_registration" => $request["end_of_pre_registration"],
                "categories" => json_encode($categoriesAssoc),
                "ratings_and_fees" => json_encode([
                    "Rookie (junior)" => $ratingsAndFees['rookie_junior'] ?? 0,
                    "Rookie" => $ratingsAndFees['rookie'] ?? 0,
                    "Semi-pro (junior)" => $ratingsAndFees['semi_pro_junior'] ?? 0,
                    "Semi-pro" => $ratingsAndFees['semi_pro'] ?? 0,
                    "Pro" => $ratingsAndFees['pro'] ?? 0,
                    "Master" => $ratingsAndFees['master'] ?? 0,
                ])
            ]);



            return response()->json([
                "message" => "Sikeres"
            ], 200);
        } catch (ValidationException $err) {
            return response()->json(['errors' => $err->errors()], 422);
        }
    }
}
