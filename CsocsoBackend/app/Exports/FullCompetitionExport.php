<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class FullCompetitionExport implements WithMultipleSheets
{
    protected int $competitionId;

    public function __construct(int $competitionId)
    {
        $this->competitionId = $competitionId;
    }

    public function sheets(): array
    {
        $sheets = [];

        $sheets[] = new RegistrationsExport($this->competitionId);

        $categories = DB::table('categories')
            ->join('registration', 'categories.id', '=', 'registration.categorie')
            ->where('registration.competition_id', $this->competitionId)
            ->select('categories.name')
            ->distinct()
            ->pluck('categories.name');

        foreach ($categories as $categoryName) {
           $sheets[] = new EmptyCategorySheetExport($categoryName, $this->competitionId);
        }

        return $sheets;
    }
}
