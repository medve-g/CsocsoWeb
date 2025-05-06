<?php

namespace App\Http\Controllers;

use App\Models\NewsModel;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function getnews()
    {

        $news = NewsModel::all()->toArray();
        return response()->json($news);
    }

    public function storenews(Request $request)
    {
    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'imagepath' => 'required|string'
    ]);

    
    $news = NewsModel::create($validatedData);

    return response()->json([
        'message' => 'Hír sikeresen feltöltve!',
        'data' => $news
    ], 201);
    }

}

