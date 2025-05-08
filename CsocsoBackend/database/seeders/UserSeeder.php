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
                "phonenumber" => "+36703120666",
                "gender" => "férfi",
                "contest_admin" => false
            ],
            [
                "username" => "Csocsó Mester",
                "email" => "admin@gmail.com",
                "password" => Hash::make("admin"),
                "phonenumber" => "+36302554668",
                "gender" => "férfi",
                "contest_admin" => true
            ]
        ]);
    }
}
