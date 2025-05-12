<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;
use App\Models\ContestModel;
use PHPUnit\Framework\Attributes\Test;

class ContestControllerTest extends TestCase
{

    use DatabaseTransactions;
    
    #[Test]
    public function it_fetches_all_contests_successfully()
    {
        

        ContestModel::factory()->create(['competition_name' => 'Test Contest 1', 'location' => 'Budapest']);
        ContestModel::factory()->create(['competition_name' => 'Test Contest 2', 'location' => 'Debrecen']);


        $response = $this->getJson('/api/contests');


        $response->assertStatus(200)
                 ->assertJsonCount(ContestModel::count());
    }

    #[Test]
    public function it_creates_a_contest_successfully()
    {
        $data = [
            "competition_name" => "New Tournament",
            "location" => "Budapest",
            "competition_start" => "2025-06-01",
            "end_of_pre_registration" => "2025-05-20",
            "categories" => [1, 2, 3],
            "ratings_and_fees" => [
                "rookie_junior" => 500,
                "rookie" => 1000,
                "semi_pro_junior" => 1500,
                "semi_pro" => 2000,
                "pro" => 2500,
                "master" => 3000,
            ]
        ];


        $response = $this->postJson('/api/newContest', $data);


        $response->assertStatus(200)
                 ->assertJson(["message" => "Sikeres"]);


        $this->assertDatabaseHas('competition', ['competition_name' => 'New Tournament']);
    }

    #[Test]
    public function it_validates_required_fields_when_creating_a_contest()
    {
        $data = []; 

        $response = $this->postJson('/api/newContest', $data);

        $response->assertStatus(422)
                 ->assertJsonStructure(["errors"]);
    }
}

