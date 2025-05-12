<?php

namespace App\Http\Controllers;

use App\Exports\FullCompetitionExport;
use App\Exports\MultipleSheetExport;
use Illuminate\Http\Request;
use App\Models\RegistrationModel;
use App\Models\CategoryModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class RegistrationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();

        $correctRegistrations = [];

        if (empty($data)) {
            return response()->json([
                "message" => "Nincs beküldött adat."
            ], 400);
        }

        foreach ($data as $registration) {

            $rules = [
                "registration_submitter" => "required|numeric",
                "categorie" => "required|numeric",
                "contestant1" => "required|array",
                "contestant1.name" => "required|string",
                "contestant1.points" => "nullable|numeric",
                "contestant1.rating" => "nullable|string",
                "contestant2" => "nullable|array",
                "contestant2.name" => "nullable|string",
                "contestant2.points" => "nullable|numeric",
                "contestant2.rating" => "nullable|string",
                "registration_fee" => "nullable|numeric",
                "competition_id" => "required|numeric",
            ];

            $category = CategoryModel::find($registration["categorie"]);

            if ($category->type == "páros") {
                $rules["contestant2.name"] = "required|string";
            }

            $validator = Validator::make($registration, $rules);

            if ($validator->fails()) {
                return response()->json([
                    "message" => "Hibás adatok",
                    "errors" => $validator->errors(),
                ], 422);
            }

            $validated = $validator->validated();

            $existingRegistration = DB::table("registration")->where("competition_id", $validated["competition_id"])->where("categorie", $validated["categorie"])->whereRaw("JSON_UNQUOTE(JSON_EXTRACT(contestant1, '$.name')) = ?", [$validated["contestant1"]["name"]])->exists();

            if ($existingRegistration) {
                return response()->json([
                    "message" => "Ez a versenyző már nevezett ebben a kategóriában ezen a versenyen"
                ], 409);
            }

            array_push($correctRegistrations, $validated);
        }

        foreach ($correctRegistrations as $singleRegistration) {
            DB::table("registration")->insert([
                "registration_submitter" => $singleRegistration["registration_submitter"],
                "categorie" => $singleRegistration["categorie"],
                "contestant1" => json_encode($singleRegistration["contestant1"]),
                "contestant2" => json_encode($singleRegistration["contestant2"] ?? null),
                "registration_fee" => $singleRegistration["registration_fee"],
                "competition_id" => $singleRegistration["competition_id"],
            ]);
        }

        return response()->json([
            "message" => "Sikeres nevezés"
        ], 201);
    }

    public function index()
    {
        $registrations = RegistrationModel::all();
        return response()->json($registrations);
    }

    public function destroy(string $id)
{
    $registration = RegistrationModel::find($id);

    if ($registration) {
        $registration->delete();
        return response()->json([
            "message" => "Sikeres törlés"
        ], 200);
    } else {
        return response()->json([
            "message" => "Nincs ilyen nevezés"
        ], 404);
    }
}

    public function showUserRegistrations(string $id)
    {
        $userRegistrations = DB::table("registration")->join("categories", "registration.categorie", "=", "categories.id")
            ->join("competition", "registration.competition_id", "=", "competition.id")->where("registration_submitter", $id)
            ->select(
                "registration.*",
                'categories.name as category_name',
                'competition.competition_name as competition_name',
            )->get();


        return response()->json($userRegistrations);
    }

    public function exportExcel(string $id)
    {
        return Excel::download(new FullCompetitionExport($id), "registrations.xlsx");
    }
}
