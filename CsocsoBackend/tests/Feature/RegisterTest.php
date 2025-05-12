<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\UserModel;
use PHPUnit\Framework\Attributes\Test;

class RegisterTest extends TestCase
{
    
    use DatabaseTransactions;

    #[Test]
    public function user_can_register_successfully()
    {
        $response = $this->postJson('/api/register', [
            "username" => "TestUser",
            "email" => "test11@example.com",
            "password" => "Password123!",
            "password_confirmation" => "Password123!",
            "phonenumber" => "+36301234567",
            "gender" => "Férfi",
            "contest_admin" => 0
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('user', ['email' => 'test11@example.com']);
    }
}


