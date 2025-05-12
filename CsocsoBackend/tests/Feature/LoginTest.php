<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\UserModel;
use PHPUnit\Framework\Attributes\Test;

class LoginTest extends TestCase
{
    
    use DatabaseTransactions;


    #[Test]
    public function user_can_log_in()
    {
        $user = UserModel::factory()->create([
            'email' => 'user@example.com',
            'password' => bcrypt('Password123!')
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'user@example.com',
            'password' => 'Password123!'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['user', 'token']);
    }
}

