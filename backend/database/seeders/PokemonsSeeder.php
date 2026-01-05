<?php

namespace Database\Seeders;

use App\Models\pokemons;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PokemonsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Masukkan data spesifik secara manual
        pokemons::factory()->create([
            'name' => 'Pokemon 1',
            'base_experience' => 'Kamera DSLR berkualitas tinggi.',
            'weight' => 7500000,
            'image_path' => 'images/kamera-canon.jpg', // Path foto
        ]);

        // Anda juga bisa menambahkan beberapa data sekaligus
        pokemons::factory()->count(5)->create(); // Tambahkan 5 data dummy acak
    }
}
