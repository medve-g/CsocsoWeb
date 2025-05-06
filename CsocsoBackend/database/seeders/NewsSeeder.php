<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("news")->insert([
            [
                "imagepath" => "http://localhost:5173/kep1.jpg",
                "title" => "ValamiHír1",
                "content" => "Ez az első hír amit az adatbázisból töltünk be"
            ],
            [
                "imagepath" => "http://localhost:5173/kep2.jpg",
                "title" => "ValamiHír2",
                "content" => "Ez az második hír amit az adatbázisból töltünk be"
            ],
            [
                "imagepath" => "http://localhost:5173/kep3.jpg",
                "title" => "ValamiHír3",
                "content" => "Ez az harmadik hír amit az adatbázisból töltünk be"
            ]
        ]);
    }
}
