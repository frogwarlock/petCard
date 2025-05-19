<?php

namespace App\Models;

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
