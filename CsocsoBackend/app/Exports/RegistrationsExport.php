<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;

class RegistrationsExport implements FromArray, WithHeadings, ShouldAutoSize, WithTitle
{
    protected $competitionId;
    protected $headings;
    protected $data;

    public function __construct($competitionId)
    {
        $this->competitionId = $competitionId;
        $this->prepareData();
    }

    protected function prepareData()
    {
        $regs = DB::table("registration")
            ->join('categories', 'registration.categorie', '=', 'categories.id')
            ->select(
                DB::raw("JSON_UNQUOTE(JSON_EXTRACT(contestant1, '$.name')) as name"),
                'registration.registration_fee',
                'categories.name as category_name'
            )
            ->where("registration.competition_id", $this->competitionId)
            ->get();

        $allCategories = $regs->pluck('category_name')->unique()->sort()->values()->toArray();

        $grouped = [];
        foreach ($regs as $reg) {
            $name = $reg->name;
            if (!isset($grouped[$name])) {
                $grouped[$name] = array_fill_keys($allCategories, '');
            }
            $grouped[$name][$reg->category_name] = $reg->registration_fee;
        }

        $this->headings = [
            array_merge(['Név'], $allCategories, ['Végösszeg'])
        ];

        $this->data = [];
        foreach ($grouped as $name => $fees) {
            $row = [$name];
            $total = 0;

            foreach ($allCategories as $cat) {
                $fee = $fees[$cat];
                if ($fee !== '') {
                    $row[] = number_format($fee, 0, '', ' ') . ' Ft';
                    $total += $fee;
                } else {
                    $row[] = '';
                }
            }

            $row[] = number_format($total, 0, '', ' ') . ' Ft';
            $this->data[] = $row;
        }
    }

    public function array(): array
    {
        return $this->data;
    }

    public function headings(): array
    {
        return $this->headings;
    }

    public function title(): string
    {
        return "Nevezések";
    }
}
