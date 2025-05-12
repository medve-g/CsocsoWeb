<?php

namespace Database\Factories;

use App\Models\ContestModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContestModelFactory extends Factory
{
    protected $model = ContestModel::class;

    public function definition()
    {
        return [
            'competition_name' => $this->faker->sentence(3),
            'location' => $this->faker->city,
            'competition_start' => $this->faker->date(),
            'end_of_pre_registration' => $this->faker->date(),
            'categories' => json_encode([
                'Nyílt Páros' => 1,
                'Nyílt Egyéni' => 2,
            ]),
            'ratings_and_fees' => json_encode([
                'Rookie (junior)' => 500,
                'Rookie' => 1500,
                'Semi-pro (junior)' => 2000,
                'Semi-pro' => 2500,
                'Pro' => 3000,
                'Master' => 3500,
            ]),
        ];
    }
}

