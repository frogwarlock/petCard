<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pet>
 */
class PetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_id' => Client::factory(),
            'name' => $this->faker->firstName(),
            'image' => null,
            'species' => $this->faker->randomElement(['dog', 'cat', 'snake', 'hamster', 'fish']),
            'birthdate' => $this->faker->date('Y-m-d', '-1 years'),
        ];
    }
}
