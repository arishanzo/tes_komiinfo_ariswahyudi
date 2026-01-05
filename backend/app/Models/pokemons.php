<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Support\Str;

class pokemons extends Model
{
   
  use HasFactory;

    
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'pokemons';
     protected $primaryKey = 'pokemon_id';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

     
    protected $fillable = [
        'pokemon_id',
        'name',   
        'base_experience',
        'weight',
        'image_path',
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->pokemon_id = (string) Str::uuid();
        });
    }
}
