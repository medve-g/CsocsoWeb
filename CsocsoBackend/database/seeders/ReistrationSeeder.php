<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReistrationSeeder extends Seeder
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
                "contestant1" => 1,
                "contestant2" => null,
                "registration_fee" => 1000,
                "competition_id" => 1
            ],
            [
              "registration_submitter" => 2,
                "categorie" => 2,
                "contestant1" => 1,
                "contestant2" => 2,
                "registration_fee" => 1000,
                "competition_id" => 2
            ]
        ]);
    }
}
