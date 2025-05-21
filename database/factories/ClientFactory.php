<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->name(),
            'number' => $this->faker->numberBetween(10000000000, 99999999999),
            'cpf' => $this->faker->unique()->numberBetween(10000000000, 99999999999),
            'email' => $this->faker->unique()->safeEmail(),
        ];
    }
}
