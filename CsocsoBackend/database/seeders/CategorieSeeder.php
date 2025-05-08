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
                "name" => "Nyílt Páros",
                "ranklist_reference" => "NYP",
                "type" => "páros"
            ],
            [
                "name" => "Nyílt Egyéni",
                "ranklist_reference" => "NYE",
                "type" => "egyéni"
            ],
            [
                "name" => "Semi_pro Páros",
                "ranklist_reference" => "NYP",
                "type" => "páros"
            ],
            [
                "name" => "Rookie Páros",
                "ranklist_reference" => "NYP",
                "type" => "páros"
            ],
            [
                "name" => "Vegyes Páros",
                "ranklist_reference" => "VP",
                "type" => "páros"
            ],
            [
                "name" => "Rookie Egyéni",
                "ranklist_reference" => "NYE",
                "type" => "egyéni"
            ],
            [
                "name" => "Amatőr Páros",
                "ranklist_reference" => "NYP",
                "type" => "páros"
            ],
            [
                "name" => "Női Páros",
                "ranklist_reference" => "NP",
                "type" => "páros"
            ],
            [
                "name" => "Női Egyéni",
                "ranklist_reference" => "NE",
                "type" => "egyéni"
            ],
            [
                "name" => "Junior Páros",
                "ranklist_reference" => "NYP",
                "type" => "páros"
            ],
            [
                "name" => "Junior Egyéni",
                "ranklist_reference" => "NYE",
                "type" => "egyéni"
            ],
            [
                "name" => "Sorsolásos Páros",
                "ranklist_reference" => "NYP",
                "type" => "egyéni"
            ],
        ]);
    }
}
