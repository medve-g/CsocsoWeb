<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class EmptyCategorySheetExport implements FromArray, WithHeadings, WithTitle, ShouldAutoSize
{
    protected string $categoryName;
    protected int $competitionId;
    protected array $data = [];
    protected string $type = "";

    public function __construct(string $categoryName, int $competitionId)
    {
        $this->categoryName = $categoryName;
        $this->competitionId = $competitionId;

        $this->prepareData();
    }

    protected function prepareData(): void
    {
        $categoryType = DB::table('categories')
            ->where('name', $this->categoryName)
            ->value('type');

        $this->type = $categoryType;

        if ($categoryType == "egyéni") {
            $results = DB::table('registration')
                ->join('categories', 'registration.categorie', '=', 'categories.id')
                ->select(
                    DB::raw("JSON_UNQUOTE(JSON_EXTRACT(contestant1, '$.name')) as name"),
                    DB::raw("JSON_UNQUOTE(JSON_EXTRACT(contestant1, '$.points')) as points"),
                    "categories.type"
                )
                ->where('registration.competition_id', $this->competitionId)
                ->where('categories.name', $this->categoryName)
                ->where('categories.type', "egyéni")
                ->orderBy('points', 'desc')
                ->get();



            $counter = 1;
            foreach ($results as $row) {
                $this->data[] = [
                    $counter++,
                    $row->name,
                    $row->points,
                ];
            }
        } else if ($categoryType == "páros") {
            $results = DB::table('registration')
                ->join('categories', 'registration.categorie', '=', 'categories.id')
                ->select(
                    DB::raw("JSON_UNQUOTE(JSON_EXTRACT(contestant1, '$.name')) as name"),
                    DB::raw("CAST(IFNULL(JSON_UNQUOTE(JSON_EXTRACT(contestant1, '$.points')), 0) AS UNSIGNED) as points"),
                    DB::raw("JSON_UNQUOTE(JSON_EXTRACT(contestant2, '$.name')) as name2"),
                    DB::raw("CAST(IFNULL(JSON_UNQUOTE(JSON_EXTRACT(contestant2, '$.points')), 0) AS UNSIGNED) as points2"),
                    DB::raw("
                                CAST(IFNULL(JSON_UNQUOTE(JSON_EXTRACT(contestant1, '$.points')), 0) AS UNSIGNED) + 
                                CAST(IFNULL(JSON_UNQUOTE(JSON_EXTRACT(contestant2, '$.points')), 0) AS UNSIGNED) 
                                as total_points
                            ")
                )
                ->where('registration.competition_id', $this->competitionId)
                ->where('categories.name', $this->categoryName)
                ->where('categories.type', "páros")
                ->orderBy('total_points', 'desc')
                ->get();



            $counter = 1;
            $alreadyDisplayed = [];
            foreach ($results as $row) {
                $pairKey = implode('|', collect([$row->name, $row->name2])->sort()->values()->toArray());

                if (!in_array($pairKey, $alreadyDisplayed)) {
                    $this->data[] = [
                        $counter++,
                        $row->name,
                        $row->points,
                        $row->name2,
                        $row->points2,
                        $row->total_points
                    ];
                    $alreadyDisplayed[] = $pairKey;
                }
            }
        }
    }

    public function array(): array
    {
        return $this->data;
    }

    public function headings(): array
    {
        if ($this->type == "egyéni") {
            return ['Sorszám', 'A versenyző neve', 'Pont'];
        } else {
            return ['Sorszám', 'Versenyző 1', 'Pontok', 'Versenyző 2', 'Pontok', 'Összesen'];
        }
    }

    public function title(): string
    {
        return mb_substr($this->categoryName, 0, 31);
    }
}
