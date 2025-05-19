<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pet extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'species',
        'name',
        'image',
        'owner_id',
        'birthdate',
    ];

    // Relacionamentos

    public function client(){
        return $this->belongsTo(Client::class, 'owner_id');
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
