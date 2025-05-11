<?php

namespace App\Exports;

use App\Models\RegistrationModel;
use Maatwebsite\Excel\Concerns\FromCollection; 
use Maatwebsite\Excel\Concerns\WithHeadings; 

class RegistrationsExport implements FromCollection, WithHeadings
{
    /**
     * Az adatokat visszaadja a `RegistrationModel` alapján.
     *
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        // Itt lekérjük az összes adatot a 'registration' táblából
        return RegistrationModel::all();
    }

    /**
     * A fejlécet állítja be az Excel fájlban.
     *
     * @return array
     */
    public function headings(): array
    {
        return [
            'ID',
            'Nevező Neve',          // registration_submitter
            'Kategória',            // categorie
            'Versenyző 1',          // contestant1
            'Versenyző 2',          // contestant2
            'Nevezési Díj',         // registration_fee
            'Verseny ID',           // competition_id
        ];
    }
}