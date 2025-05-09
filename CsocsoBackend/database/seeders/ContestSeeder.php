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
                    "Nyílt Páros" => 1,
                    "Nyílt Egyéni" => 2,
                    "Rookie Páros" => 4
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
                    "Nyílt Páros" => 1,
                    "Nyílt Egyéni" => 2,
                    "Rookie Páros" => 4
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
