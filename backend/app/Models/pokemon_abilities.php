<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Support\Str;

class pokemon_abilities extends Model
{
  use HasFactory;

    
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'pokemon_abilities';
     protected $primaryKey = 'pokemonabilities_id';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

     
    protected $fillable = [
        'pokemonabilities_id',
        'pokemon_id',  
        'ablities_id',   
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->pokemonabilities_id = (string) Str::uuid();
        });
    }
}
