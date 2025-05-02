<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("user")->insert([
            [
                "username" => "Csocsós Csanád",
                "email" => "pelda@gmail.com",
                "password" => Hash::make("123qwe"),
                "contest_admin" => false
            ],
            [
                "username" => "Csocsó Mester",
                "email" => "viharsarkicse@gmail.com",
                "password" => Hash::make("csocso"),
                "contest_admin" => true
            ]
        ]);
    }
}
