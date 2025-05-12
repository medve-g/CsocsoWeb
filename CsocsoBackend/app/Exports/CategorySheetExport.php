<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CategorySheetExport implements FromArray, WithHeadings, WithTitle
{
    protected string $categoryName;
    protected int $competitionId;

    protected array $data = [];

    public function __construct(string $categoryName, int $competitionId)
    {
        $this->categoryName = $categoryName;
        $this->competitionId = $competitionId;
        $this->prepareData();
    }

    protected function prepareData(): void
    {
        $regs = DB::table('registration')
            ->join('categories', 'registration.categorie', '=', 'categories.id')
            ->select(
                DB::raw("JSON_UNQUOTE(JSON_EXTRACT(contestant1, '$.name')) as name"),
                DB::raw("JSON_UNQUOTE(JSON_EXTRACT(contestant1, '$.points')) as points")
            )
            ->where('categories.name', $this->categoryName)
            ->where('categories.type', 'single')
            ->where('registration.competition_id', $this->competitionId)
            ->get();

        $counter = 1;
        foreach ($regs as $reg) {
            $this->data[] = [
                $counter++,
                $reg->name,
                $reg->points,
            ];
        }
    }

    public function array(): array
    {
        return $this->data;
    }

    public function headings(): array
    {
        return ['Sorszám', 'A versenyző neve', 'Pont'];
    }

    public function title(): string
    {
        return mb_substr($this->categoryName, 0, 31); // max Excel munkalap cím hossz
    }
}
