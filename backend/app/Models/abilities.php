<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Support\Str;

class abilities extends Model
{
      use HasFactory;

    
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'abilities';
     protected $primaryKey = 'ablities_id';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

     
    protected $fillable = [
        'ablities_id',
        'name',   
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->ablities_id= (string) Str::uuid();
        });
    }
}
