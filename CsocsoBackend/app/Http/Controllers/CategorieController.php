<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategorieController extends Controller
{
    public function sendRequestedCategories(Request $request)
    {
        try {
            $requestedCategories = [];
            foreach ($request->all() as $key => $value) {
                $categorie = DB::table('categories')->where('id', $value)->first();

                if ($categorie) {
                    array_push($requestedCategories, $categorie);
                }
            }

            return response()->json($requestedCategories);
        } catch (Exception $err) {
            return response()->json(['errors' => $err->getMessage()], 500);
        }
    }
}
