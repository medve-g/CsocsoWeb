<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContestSeeder extends Seeder
{
    public function run(): void
    {
        DB::table("competition")->insert([
            [
                "competition_name" => "Giga verseny",
                "location" => "Békéscsaba, Széchenyi u. 4, 5600",
                "competition_start" => "2025-05-10 14:00:00",
                "end_of_pre_registration" => "2025-05-09 14:00:00",
                "categories" => json_encode([
                    "categorie_id" => 1,
                    "categorie_id" => 2,
                    "categorie_id" => 4
                ]),
                "ratings_and_fees" => json_encode([
                    "Rookie (junior)" => 500,
                    "Rookie" => 1500,
                    "Semi-pro (junior)" => 1000,
                    "Semi-pro" => 2500,
                    "Pro" => 3000,
                    "Master" => 4000
                ])
            ],
            [
                "competition_name" => "Kicsi verseny",
                "location" => "Békéscsaba, Széchenyi u. 4, 5600",
                "competition_start" => "2025-06-10 14:00:00",
                "end_of_pre_registration" => "2025-06-09 14:00:00",
                "categories" => json_encode([
                    "categorie_id" => 5,
                    "categorie_id" => 6,
                    "categorie_id" => 7
                ]),
                "ratings_and_fees" => json_encode([
                    "Rookie (junior)" => 500,
                    "Rookie" => 1500,
                    "Semi-pro (junior)" => 1000,
                    "Semi-pro" => 2500,
                    "Pro" => 3000,
                    "Master" => 4000
                ])
            ]
        ]);
    }
}
