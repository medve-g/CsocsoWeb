<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("categories")->insert([
            [
                "name" => "Nyílt Egyéni",
                "ranklist_reference" => "NYE",
                "type" => "egyéni"
            ],
            [
                "name" => "Nyílt Páros",
                "ranklist_reference" => "NYP",
                "type" => "páros"
            ],
        ]);
    }
}
