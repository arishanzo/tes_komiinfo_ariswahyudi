
import { getFetchCache } from "../../fetchCahce/getFetchCache";
import axiosClient from "../../axios";

export const getAbilities = async () => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/abilities`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}