<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("registration")->insert([
            [
                "registration_submitter" => 1,
                "categorie" => 1,
                "contestant1" => json_encode([
                    "name" => "Rozsos Gábor",
                    "rating" => "Master",
                    "points" => 885
                ]),
                "contestant2" => null,
                "registration_fee" => 1000,
                "competition_id" => 1
            ],
            [
                "registration_submitter" => 2,
                "categorie" => 2,
                "contestant1" => json_encode([
                    "name" => "Rozsos Gábor",
                    "rating" => "Master",
                    "points" => 1000
                ]),
                "contestant2" => json_encode([
                    "name" => "Tálai Gergely",
                    "rating" => "Master",
                    "points" => 855
                ]),
                "registration_fee" => 1000,
                "competition_id" => 2
            ]
        ]);
    }
}
