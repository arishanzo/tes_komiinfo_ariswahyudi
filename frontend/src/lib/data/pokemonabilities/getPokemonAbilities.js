
import { getFetchCache } from "../../fetchCahce/getFetchCache";
import axiosClient from "../../axios";

export const getPokemonAbilities = async () => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/pokemonabilities`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}