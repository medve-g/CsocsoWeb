<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RanklistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("ranklist")->insert([
            [
                "name" => "Rozsos Gábor",
                "points" => "1000",
                "categorie" => 2
            ],
            [
                "name" => "Tálai Gergely",
                "points" => "855",
                "categorie" => 2
            ]
        ]);
    }
}
