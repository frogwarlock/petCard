<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class Client extends Model
{
    use HasFactory, softDeletes, HasRoles;
    protected $fillable = [
        'name',
        'number',
        'cpf',
        'email',
    ];

    // formato cpf 000.000.000-00 s
    public function getCpfAttribute($value)
    {
        // o código faz a formatação do cpf através de uma expressão regular
        return preg_replace('/(\d{3})(\d{3})(\d{3})(\d{2})/', '$1.$2.$3-$4', $value);

    }

    public function user(){
        return $this->belongsTo(User::class);
    }


    public function pets(){
        return $this->hasMany(Pet::class);
    }


}
