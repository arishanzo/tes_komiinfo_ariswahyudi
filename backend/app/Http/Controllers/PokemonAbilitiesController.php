<?php

namespace App\Http\Controllers;

use App\Http\Requests\PokemonAbilitiesRequest;
use App\Models\pokemon_abilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PokemonAbilitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */

        
    public function getAll () {
        $getAll = pokemon_abilities::get();

           return response()->json([
            'data' => $getAll,
        ]);
    }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
   
    public function store (PokemonAbilitiesRequest $request) {


        $data = $request->validated();
       
       
       
        try {
           
                $result = pokemon_abilities::create($data);
        
        
            return response()->json([
                'message' => 'Berhasil Disimpan',
                'data' => $result
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan',
                'error' => $e->getMessage()
            ], 500);
        }
    }  

    /**
     * Display the specified resource.
     */
    public function show(pokemon_abilities $pokemon_abilities)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(pokemon_abilities $pokemon_abilities)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, pokemon_abilities $pokemon_abilities)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($pokemon_id)
    {
        try {
            $pokemonAbility = pokemon_abilities::where('pokemon_id', $pokemon_id)->firstOrFail();
            $pokemonAbility->delete();

            return response()->json([
                'success' => true,
                'message' => 'berhasil dihapus',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
