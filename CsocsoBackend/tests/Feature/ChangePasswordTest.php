<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\UserModel;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\Test;

class ChangePasswordTest extends TestCase
{

    use DatabaseTransactions;
    
    #[Test]
    public function user_can_change_password()
    {
        $user = UserModel::factory()->create([
            'password' => bcrypt('OldPassword123!')
        ]);

        $this->actingAs($user)
             ->putJson('/api/user/changePassword', [
                 'current_password' => 'OldPassword123!',
                 'new_password' => 'NewPassword123!',
                 'new_password_confirmation' => 'NewPassword123!'
             ])
             ->assertStatus(200);

        $this->assertTrue(Hash::check('NewPassword123!', $user->fresh()->password));
    }
}


