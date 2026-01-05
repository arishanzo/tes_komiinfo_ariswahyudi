
import { getFetchCache } from "../../fetchCahce/getFetchCache";
import axiosClient from "../../axios";

export const getPokemons = async () => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/pokemons`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}