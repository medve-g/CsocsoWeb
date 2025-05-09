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
        'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    if ($request->hasFile('image')) {

        $fileName = time() . '.' . $request->file('image')->getClientOriginalExtension();
        

        $request->file('image')->move(public_path(), $fileName);
        

        $validatedData['imagepath'] = url('/') . '/' . $fileName;
    } else {
        return response()->json(['error' => 'No image uploaded'], 400);
    }

    $news = NewsModel::create($validatedData);

    return response()->json([
        'message' => 'Hír sikeresen feltöltve!',
        'data' => $news
    ], 201);
}


    
}

