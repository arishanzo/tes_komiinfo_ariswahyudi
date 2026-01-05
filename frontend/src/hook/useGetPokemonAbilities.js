import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getPokemonAbilities } from "../lib/data/PokemonAbilities/getPokemonAbilities";

export const UseGetPokemonAbilities = () => {
  const [pokemonAbilities, setPokemonAbilities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPokemonAbilities = async () => {
      try {
        setLoading(true);
        const result = await getFetchCache( () => getPokemonAbilities(), 5, 3000);
        if (isMounted) setPokemonAbilities(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setPokemonAbilities(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat Abilities"
            );
          }
        }

      } finally {
        if (isMounted) setLoading(false);
      }

    };

    const timer = setTimeout(() => {
      fetchPokemonAbilities();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { pokemonAbilities, loading, error };
};
