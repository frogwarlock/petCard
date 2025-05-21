<?php

namespace App\Models;

use App\Enums\VaccineName;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;
    protected $fillable = [
        'clinic_id',
        'employee_id',
        'pet_id',
        'observation',
        'has_vaccine',
        'vaccine_name',
        'vaccine_date',
        'next_dose_date',
    ];

    protected $casts = [
        'has_vaccine' => 'boolean',
        'vaccine_date' => 'date',
        'next_dose_date' => 'date',
        'vaccine_name' => VaccineName::class
    ];

    public function clinic(){
        return $this->belongsTo(Clinic::class);
    }

    public function employee(){
        return $this->belongsTo(Employee::class);
    }

    public function pet(){
        return $this->belongsTo(Pet::class);
    }
}
