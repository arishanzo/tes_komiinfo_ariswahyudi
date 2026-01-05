import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import toast from "react-hot-toast";
import axiosClient from "../../../lib/axios";
import { UseGetAbilities } from "../../../hook/useGetAbilities";
import { UseGetPokemons } from "../../../hook/useGetPokemons";

const ModalEditPokemonAbilities = ({ isOpen, selectedPokemonAbilities, onClose }) => {
  const [formData, setFormData] = useState({
    pokemon_id: "",
    ablities_id: ""
  });
  const [loading, setLoading] = useState(false);

  const { Abilities } = UseGetAbilities() || [];
  const { Pokemons } = UseGetPokemons() || [];

  useEffect(() => {
    if (selectedPokemonAbilities) {
      setFormData({
        pokemon_id: selectedPokemonAbilities.pokemon_id || "",
        ablities_id: selectedPokemonAbilities.ablities_id || ""
      });
    }
  }, [selectedPokemonAbilities]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const toastLoading = toast.loading("Memproses data...");
      
      await axiosClient.put(`/api/pokemonabilities/${selectedPokemonAbilities.pokemon_id}`, formData);
      
      toast.dismiss(toastLoading);
      toast.success("🎉 Pokemon Abilities Berhasil Diupdate", {
        style: {
          border: '1px solid #16A34A',
          background: '#ECFDF5',
          color: '#065F46',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#16A34A',
          secondary: '#ECFDF5',
        },
      });

      onClose();
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Gagal mengupdate data");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Pokemon Abilities</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pokemon
            </label>
            <select
              value={formData.pokemon_id}
              onChange={(e) => setFormData({ ...formData, pokemon_id: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            >
              <option value="">Pilih Pokemon</option>
              {Pokemons?.map((pokemon) => (
                <option key={pokemon.pokemon_id} value={pokemon.pokemon_id}>
                  {pokemon.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ability
            </label>
            <select
              value={formData.ablities_id}
              onChange={(e) => setFormData({ ...formData, ablities_id: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            >
              <option value="">Pilih Ability</option>
              {Abilities?.map((ability) => (
                <option key={ability.ablities_id} value={ability.ablities_id}>
                  {ability.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              {loading ? "Menyimpan..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditPokemonAbilities;