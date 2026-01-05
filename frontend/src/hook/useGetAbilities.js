import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getAbilities } from "../lib/data/abilities/getAbilities";

export const UseGetAbilities = () => {
  const [Abilities, setAbilities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAbilities = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getAbilities(), 5, 3000);
        if (isMounted) setAbilities(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setAbilities(null);
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
      fetchAbilities();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { Abilities, loading, error };
};
