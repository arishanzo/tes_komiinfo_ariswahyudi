<?php

namespace App\Http\Controllers;

use App\Http\Requests\PokemonsRequest;
use App\Models\pokemons;
use Illuminate\Http\Request;


use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;


class PokemonsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     
    public function getAll () {
        $getAll = pokemons::get();

           return response()->json([
            'data' => $getAll,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
   
    public function store (PokemonsRequest $request) {

        $data = $request->validated();

        $cekprofil = pokemons::where('image_path', $data['image_path'])->first();

        if ($request->hasFile('image_path')) {
            if ($cekprofil && $cekprofil->image_path && Storage::disk(env('PHOTO_PRIVATE_DISK', 'private'))->exists($cekprofil->fimage_path)) {
                Storage::disk(env('PHOTO_PRIVATE_DISK', 'private'))->delete($cekprofil->image_path);
            }

            $file = $request->file('image_path');
            $image = Image::make($file)->encode('webp', 80);
            $encoded = (string) $image->encode();
            $disk = env('PHOTO_PRIVATE_DISK', 'private');
            $filename = Str::uuid()->toString().'.webp';
            $path = 'photos/'.date('Y/m/d').'/'.$filename;
            $data['image_path'] = $path;
            
            Storage::disk($disk)->put($path, $encoded, 'private');
        } else {
            unset($data['image_path']);
        }

        try {
            if($cekprofil){
                
                $cekprofil->update($data);
                $result = $cekprofil;

            } else {
                $result = pokemons::create($data);
            }


            return response()->json([
                'message' => 'Berhasil Disimpan',
                'data' => $result
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }   

    /**
     * Display the specified resource.
     */
    public function show(pokemons $pokemons)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(pokemons $pokemons)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, pokemons $pokemons)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */


    
 public function getPhoto($path) {
        $disk = env('PHOTO_PRIVATE_DISK', 'private');
        $decodedPath = urldecode($path);

        if (!Storage::disk($disk)->exists($decodedPath)) {
            abort(404);
        }

        $file = Storage::disk($disk)->get($decodedPath);
        $type = Storage::disk($disk)->mimeType($decodedPath) ?? 'image/webp';

        return response($file, 200)->header('Content-Type', $type);
    }


   
public function destroy($pokemon_id)
{
    try {
        $tugas = pokemons::findOrFail($pokemon_id);
        $tugas->delete();



        return response()->json([
            'success' => true,
            'message' => 'berhasil dihapus',
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal menghapus tugas',
            'error' => $e->getMessage()
        ], 500);
    }
}
}
