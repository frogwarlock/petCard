<?php

namespace Database\Factories;

use App\Models\Clinic;
use App\Models\Employee;
use App\Models\Pet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'clinic_id' => Clinic::factory(),
            'employee_id' => Employee::factory(),
            'pet_id' => Pet::factory(),
            'observation' => $this->faker->sentence(),
        ];
    }
}
