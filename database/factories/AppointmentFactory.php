<?php

namespace Database\Factories;

use App\Enums\VaccineName;
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
        $faker = $this->faker;
        $hasVaccine = $faker->boolean(70); // 70% dos casos terão vacina
        $vaccineName = $hasVaccine ? $faker->randomElement(VaccineName::cases()) : null;
        $vaccineDate = $hasVaccine ? $faker->dateTimeBetween('-1 year', 'now') : null;
        $nextDoseDate = $hasVaccine ? (clone $vaccineDate)->modify('+1 year') : null;

        return [
            'clinic_id' => Clinic::factory(),
            'employee_id' => Employee::factory(),
            'pet_id' => Pet::factory(),
            'has_vaccine' => $hasVaccine,
            'vaccine_name' => $vaccineName?->value,
            'vaccine_date' => $vaccineDate,
            'next_dose_date' => $nextDoseDate,
            'observation' => $faker->sentence(),
        ];
    }
}
