<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class Employee extends Model
{
    use HasFactory, softDeletes, HasRoles;
    protected $fillable =[
        'clinic_id',
        'name',
        'picture',
        'birthdate',
    ];

    public function clinic(){
        return $this->belongsTo(Clinic::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function appointments(){
        return $this->hasMany(Appointment::class);
    }

    public function getFormattedBirthdateAtribbute($value){
        //se tiver data formata se não retorna nulo
        if(!empty($value)){
            return Carbon::parse($value)->format('d/m/Y');
        }

    }
}
