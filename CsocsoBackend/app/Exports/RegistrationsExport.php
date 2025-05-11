<?php

namespace App\Exports;

use App\Models\RegistrationModel; // Itt a RegistrationModel kell
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RegistrationsExport implements FromCollection, WithHeadings
{
    /**
     * Visszaadja az exportált adatokat.
     */
    public function collection()
    {
        return RegistrationModel::select([
            'id',
            'registration_submitter',
            'categorie',
            'contestant1',
            'contestant2',
            'registration_fee',
            'competition_id',
        ])->get();
    }

    /**
     * Fejlécek a táblázat tetejére.
     */
    public function headings(): array
    {
        return [
            'ID',
            'Registration Submitter',
            'Categorie',
            'Contestant 1',
            'Contestant 2',
            'Registration Fee',
            'Competition ID',
        ];
    }
}