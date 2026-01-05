<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PokemonAbilitiesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
         'pokemon_id' => 'required|exists:pokemons,pokemon_id',
         'ablities_id' => 'required|exists:abilities,ablities_id',
        ];
    }


     public function messages(): array
    {
        return [
    
        ];
    }
}
