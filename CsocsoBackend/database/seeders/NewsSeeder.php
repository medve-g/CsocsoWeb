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
                "title" => "Szenzációs eredmények a hétvégi Hungarian Leonhart Open 2025 - ITSF 500 WT nemzetközi versenyen! 🏆",
                "content" => "Az elmúlt hétvégén zajlott le az idei versenyszezon legjelentősebb hazai versenye, amelyen Európa számos országából több száz versenyző vett részt, köztük természetesen Egyesületünk 14(!) tagja is. Az elért eredményeink pedig magukért beszélnek: a megrendezésre került 13 kategóriából 3-at Viharsarki csapat nyert meg, illetve több egyéb dobogós helyezés is született."
            ],
            [
                "imagepath" => "http://localhost:5173/kep2.jpg",
                "title" => "Hungarian Leonhart Open 2025 - ITSF 500 WT nívósabb eredményei", 
                "content" => "A Nyílt páros kategória 109 csapatos mezőnyében veretlenül, tökéletes teljesítményt nyújtva és kiváló csapatokat felülmúlva sikerült az első helyre odaérni a Diós Norbert - Szeverényi Dániel csapatnak!  
                                🥇A Vegyes páros kategóriát szintén veretlenül, főágról sikerült behúznia a Szeverényi Dániel - Németh Edina csapatnak! 
                                🥇A Rookie egyéni kategóriában Gyuricza Tamás bizonyult a legjobbnak, aki a főág döntő elvesztése után a vigaszágról hatalmasat küzdve gyűrte le ellenfeleit!
                                🥈Tomi az U19 egyéni kategóriában is beverekedte magát a döntőbe, ahol azonban szintén nagyot játszva alulmaradt ellenfelével szemben.
                                🥉Földi Nóra a Női egyéni kategóriában legjobb magyarként a 3. helyre ért oda, több rengeteg nemzetközi rutinnal rendelkező játékost is legyőzve! 
                                🥉A Rookie páros kategóriában a finoman szólva sem túl összeszokott Csizmadia Róbert - Tóth Márta csapat kiváló teljesítménnyel szintén odaért a dobogó alsó fokára!"
            ],
            [
                "imagepath" => "http://localhost:5173/kep3.jpg",
                "title" => "Hungarian Leonhart Open 2025 ITSF 500 WT ovábbi top 10-es eredményei:",
                "content" => "Sorsolásos páros (67 csapat):
                                5. hely: Knyihár János - Ugur Imert
                                9. hely: Földi Zsolt - Vasvenszki Gábor
                                Vegyes páros (53 csapat):
                                9. hely: Földi Nóra - Börcsök Szabolcs
                                U19 egyéni (19 induló):
                                5. hely: Makai Márton
                                7. hely: Verók Csaba
                                9. hely: Csizmadia Róbert
                                Női páros (24 csapat):
                                5. hely: Földi Nóra - Smolnauer Szabina
                                Nyílt egyéni (130 induló):
                                7. hely: Börcsök Szabolcs
                                U19 páros (9 csapat):
                                4. hely: Csizmadia Róbert - Verók Csaba
                                5. hely: Gyuricza Tamás - Makai Márton
                                9. hely: Czombos Balázs - Gubucz Panna"
            ]
        ]);
    }
}
