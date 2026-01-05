<?php

use App\Http\Controllers\AbilitiesController;
use App\Http\Controllers\PokemonAbilitiesController;
use App\Http\Controllers\PokemonsController;
use App\Models\pokemon_abilities;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::get('/auth/google/redirect', [GoogleController::class, 'redirectToGoogle']);
// Route::post('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);



Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf' => csrf_token()]);
});

Route::get('/check-session', function () {
    return response()->json([
        'authenticated' => Auth::check()
    ]);
});




Route::get('/hello', function () {
    return ['message' => 'Hello from Laravel API 🚀'];
});




    
    Route::get('/abilities', [AbilitiesController::class, 'getAll']);
 Route::get('/pokemons', [PokemonsController::class, 'getAll']);
 Route::get('/pokemonabilities', [PokemonAbilitiesController::class, 'getAll']);


    Route::get('/photos/{path}', [PokemonsController::class, 'getPhoto'])->where('path', '.*');
 
    Route::post('/createpokemons', [PokemonsController::class, 'store']);

    Route::post('/createabilities', [AbilitiesController::class, 'store']);
    
    Route::post('/createpokemonabilities', [PokemonAbilitiesController::class, 'store']);


    Route::post('/createpokemonabilities', [PokemonAbilitiesController::class, 'store']);
  

         Route::delete('/abilities/{ablities_id}', [AbilitiesController::class, 'destroy']);
         Route::delete('/pokemons/{pokemon_id}', [PokemonsController::class, 'destroy']);
         Route::delete('/pokemonabilities/{pokemon_id}', [PokemonAbilitiesController::class, 'destroy']);

    


