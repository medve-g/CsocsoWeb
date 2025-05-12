<?php

namespace Database\Factories;

use App\Models\NewsModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


class NewsModelFactory extends Factory
{
    protected $model = NewsModel::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence(6),
            'content' => Str::limit($this->faker->paragraphs(3, true), 250),
            'imagepath' => $this->faker->imageUrl(640, 480, 'news', true)
        ];
    }
}

