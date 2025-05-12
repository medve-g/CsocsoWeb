<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Str;
use Tests\TestCase;
use App\Models\UserModel;
use PHPUnit\Framework\Attributes\Test;

class UpdateProfileTest extends TestCase
{
    
    use DatabaseTransactions;

    #[Test]
    public function user_can_update_profile()
    {
        $user = UserModel::factory()->create();

        $newEmail = 'updated_' . Str::random(5) . '@example.com';

        $this->actingAs($user, 'sanctum')
            ->putJson('/api/user/update', [
                "username" => "UpdatedUser",
                "email" => $newEmail
            ])
            ->assertStatus(200);

        $this->assertDatabaseHas('user', ['email' => $newEmail]);
    }

}

