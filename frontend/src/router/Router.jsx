import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Dashboard from '../user/dashboard/Dashboard';
import PublicRoute from './PublicRoute';
import Pokemons from '../user/pokemons/Pokemons';
import Abilities from '../user/abilities/Abilities';
import PokemonAbilites from '../user/pokemonabilities/PokemonAbilites';



const Routeer = () => {
 
    

    return(

<Routes>
  {/* Hanya untuk user yang sudah login */}
  <Route path="/" element={<PublicRoute><Dashboard /></PublicRoute>}/>
  
  <Route path="/pokemons" element={<PublicRoute><Pokemons/></PublicRoute>}/>

  
  <Route path="/pokemonabilities" element={<PublicRoute><PokemonAbilites /></PublicRoute>}/>

  
  <Route path="/abilities" element={<PublicRoute><Abilities /></PublicRoute>}/>
  
  

</Routes>
        
    );


}

export default Routeer;