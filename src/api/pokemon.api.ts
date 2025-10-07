import type { Pokemon, PokemonSpecies } from "@/models";
import api from "./axios.config";


/**
 * Obtiene una lista básica de Pokémon (solo name y url)
 */
export const getPokemons = async (limit = 20, offset = 0) => {
  const response = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
 const { results, next, previous, count } = response.data;
  return { results, next, previous, count };
};

/**
 * Obtiene un Pokémon
 */
export const getPokemonByName = async (name: string) => {
  const response = await api.get(`pokemon/${name}`);
  return response.data;
};

/**
 * Recibe la lista básica y trae los detalles completos
 */
export const getDetailedPokemons = async (list: { name: string; url: string }[]): Promise<Pokemon[]> => {
  const detailedPokemons = await Promise.all(
    list.map(async (p) => {
      const detail = await api.get(p.url);
      return {
        id: detail.data.id,
        name: detail.data.name,
        image: detail.data.sprites.other["official-artwork"].front_default,
        types: detail.data.types.map((t: { type: { name: string; }} ) => t.type.name),
        height: detail.data.height,
        weight: detail.data.weight,
      } as Pokemon;
    })
  );

  return detailedPokemons;
};


export const getPokemonDescription = async (name: string) => {
  const response = await api.get<PokemonSpecies>(`pokemon-species/${name}`);
  const englishText = response.data.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );
  return englishText ? englishText.flavor_text : "No description available.";
};


export const getPokemonTypes = async () => {
  const response = await api.get(`type`);
  return response.data.results;
};
