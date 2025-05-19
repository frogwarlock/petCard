<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Clinic;
use App\Models\Client;
use App\Models\Employee;
use App\Models\Pet;
use App\Models\Appointment;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 🔐 1. Criar Admin Filament
        $this->seedAdminUser();

        // 🏥 2. Criar clínicas
        $clinics = $this->seedClinics();

        // 👩‍⚕️ 3. Criar funcionários por clínica
        $employeesByClinic = $this->seedEmployees($clinics);

        // 👤 4. Criar clientes
        $clients = $this->seedClients();

        // 🐶 5. Criar pets para cada cliente
        $petsByClient = $this->seedPets($clients);

        // 📆 6. Criar consultas para pets
        $this->seedAppointments($clinics, $employeesByClinic, $petsByClient);
    }

    protected function seedAdminUser()
    {
        $user = User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin1234'),
        ]);

        $user->assignRole('admin');
    }

    protected function seedClinics()
    {
        return Clinic::factory()->count(3)->create();
    }

    protected function seedEmployees($clinics)
    {
        $map = [];

        foreach ($clinics as $clinic) {
            $employees = Employee::factory()->count(2)->create([
                'clinic_id' => $clinic->id,
            ]);

            $map[$clinic->id] = $employees;
        }

        return $map;
    }

    protected function seedClients()
    {
        return Client::factory()->count(5)->create();
    }

    protected function seedPets($clients)
    {
        $map = [];

        foreach ($clients as $client) {
            $pets = Pet::factory()->count(rand(1, 3))->create([
                'client_id' => $client->id,
            ]);

            $map[$client->id] = $pets;
        }

        return $map;
    }

    protected function seedAppointments($clinics, $employeesByClinic, $petsByClient)
    {
        foreach ($clinics as $clinic) {
            $employees = $employeesByClinic[$clinic->id];

            foreach ($petsByClient as $pets) {
                foreach ($pets as $pet) {
                    Appointment::factory()->create([
                        'clinic_id' => $clinic->id,
                        'employee_id' => $employees->random()->id,
                        'pet_id' => $pet->id,
                    ]);
                }
            }
        }
    }
}
