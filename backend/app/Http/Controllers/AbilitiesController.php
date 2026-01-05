<?php

namespace App\Http\Controllers;

use App\Http\Requests\AbilitiesRequest;
use App\Models\abilities;
use Illuminate\Http\Request;

class AbilitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

      public function getAll () {
        $getAll = abilities::get();

           return response()->json([
            'data' => $getAll,
        ]);
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
    public function store (AbilitiesRequest $request) {


        $data = $request->validated();
       
       
       
        try {
           
                $result = abilities::create($data);
        
        
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
    public function show(abilities $abilities)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(abilities $abilities)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, abilities $abilities)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
   
public function destroy($ablities_id)
{
    try {
        $tugas = abilities::findOrFail($ablities_id);
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
