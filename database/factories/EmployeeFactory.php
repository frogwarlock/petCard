<?php

namespace Database\Factories;

use App\Models\Clinic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => user::factory()->create()->id,
            'clinic_id' => Clinic::factory(),
            'name' => $this->faker->name(),
            'picture'=> null,
            'birthdate' => $this->faker->date('Y-m-d', '-18 years'),
        ];
    }
}
