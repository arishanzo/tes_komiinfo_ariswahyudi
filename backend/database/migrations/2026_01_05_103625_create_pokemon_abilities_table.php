<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pokemon_abilities', function (Blueprint $table) {
            $table->uuid('pokemonabilities_id');
            $table->uuid('pokemon_id');
             $table->uuid('ablities_id');
            $table->timestamps();

                
        });

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
          Schema::table('pokemon_abilities', function (Blueprint $table) {
            $table->dropForeign('fk_pokemon_id');
             $table->dropForeign('fk_ablities_id');
        });


        Schema::dropIfExists('pokemon_abilities');
    }
};
