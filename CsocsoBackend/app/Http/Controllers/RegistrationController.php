<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RegistrationModel;
use App\Exports\RegistrationsExport;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class RegistrationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();

        if (empty($data)) {
            return response()->json([
                "message" => "Nincs beküldött adat."
            ], 400);
        }

        foreach ($data as $registration) {
            $validator = Validator::make($registration, [
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
                "registration_fee" => "required|numeric",
                "competition_id" => "required|numeric",
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "message" => "Validációs hiba",
                    "errors" => $validator->errors(),
                ], 422);
            }

            $validated = $validator->validated();

            DB::table("registration")->insert([
                "registration_submitter" => $validated["registration_submitter"],
                "categorie" => $validated["categorie"],
                "contestant1" => json_encode($validated["contestant1"]),
                "contestant2" => json_encode($validated["contestant2"] ?? null),
                "registration_fee" => $validated["registration_fee"],
                "competition_id" => $validated["competition_id"],
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

    public function exportExcel()
    {
        return Excel::download(new RegistrationsExport, "registrations.xlsx");
    }
}
