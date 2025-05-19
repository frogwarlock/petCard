<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class Clinic extends Model
{
    use HasFactory, softDeletes, HasRoles;
    protected $fillable =[
        'name',
        'cnpj',
        'address',
    ];

    // Adiciona relacionamentos
    // Funcionario
    // consultas

    public function employees(){
        return $this->hasMany(Employee::class);
    }

    public function appointments(){
        return $this->hasMany(Appointment::class);
    }
}
