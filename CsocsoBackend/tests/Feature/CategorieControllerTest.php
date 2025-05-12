<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Attributes\Test;

class CategorieControllerTest extends TestCase
{
    
    use DatabaseTransactions;

    #[Test]
    public function it_returns_requested_categories()
    {
        DB::table('categories')->insert([
    ['name' => 'Category 1', 'ranklist_reference' => "NYP"],
    ['name' => 'Category 2', 'ranklist_reference' => "NYE"],
    ['name' => 'Category 3', 'ranklist_reference' => "NE"],
]);

        $response = $this->postJson('/api/categories', [1, 2, 4]); 

        $response->assertStatus(200);

        $response->assertJson([
            ['id' => 1, 'name' => 'Nyílt Páros', 'ranklist_reference' => 'NYP', 'type' => 'páros'],
            ['id' => 2, 'name' => 'Nyílt Egyéni', 'ranklist_reference' => 'NYE', 'type' => 'egyéni'],
        ]);

        $response->assertJsonMissing([
            ['id' => 4]
        ]);
    }

    #[Test]
    public function it_handles_empty_requests_gracefully()
    {
        $response = $this->postJson('/api/categories', []);

        $response->assertStatus(200)
                 ->assertExactJson([]);
    }
}
