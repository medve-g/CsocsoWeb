<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RegistrationModel;
use App\Exports\RegistrationsExport;
use Maatwebsite\Excel\Facades\Excel;

class RegistrationController extends Controller
{
    public function store(Request $request)
    {
        $registration = RegistrationModel::create($request->all());

        return response()->json([
            'message' => 'Sikeres nevezés!',
            'data' => $registration
        ], 201);
    }

    public function index()
    {
        $registrations = RegistrationModel::all();
        return response()->json($registrations);
    }

    public function exportExcel()
    {
        return Excel::download(new RegistrationsExport, 'registrations.xlsx');
    }
}
