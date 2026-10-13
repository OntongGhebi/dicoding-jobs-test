<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VacancyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->jobTitle(),
            'company' => $this->faker->company(),
            'location' => $this->faker->city(),
            'description' => $this->faker->paragraph(),
            'salary' => 'Rp 8.000.000 - Rp 15.000.000',
        ];
    }
}
