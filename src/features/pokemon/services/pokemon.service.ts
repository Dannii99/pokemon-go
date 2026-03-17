import type { Pokemon, PokemonSpecies } from "@/features/pokemon/types/pokemon.types";
import api from "@/services/apiClient";


/**
 * Obtiene una lista básica de Pokémon (solo name y url)
 */
export const getPokemons = async (limit = 20, offset = 0) => {
  const response = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
 const { results, next, previous, count } = response.data;
  return { results, next, previous, count };
};

/**
 * Obtiene los detalles completos de un Pokémon por ID o nombre
 */
export const getPokemonById = async (id: string | number) => {
  const response = await api.get(`pokemon/${id}`);
  return response.data;
};

/**
 * Obtiene la información de especie de un Pokémon
 */
export const getPokemonSpecies = async (id: string | number) => {
  const response = await api.get(`pokemon-species/${id}`);
  return response.data;
};

/**
 * Obtiene la cadena de evolución desde una URL completa
 */
export const getEvolutionChain = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

/**
 * Obtiene los detalles de un tipo para calcular efectividades
 */
export const getTypeData = async (type: string) => {
  const response = await api.get(`type/${type}`);
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
  return englishText ? englishText.flavor_text : "No hay descripción disponible.";
};


/**
 * Obtiene todos los Pokémon (nombres y URLs) para búsqueda local
 */
export const getAllPokemons = async () => {
  const response = await api.get(`pokemon?limit=2000`);
  return response.data.results as { name: string; url: string }[];
};

/**
 * Obtiene todos los tipos de Pokémon
 */
export const getPokemonTypes = async () => {
  const response = await api.get(`type`);
  return response.data.results as { name: string; url: string }[];
};

/**
 * Obtiene Pokémon por tipo
 */
export const getPokemonsByType = async (type: string) => {
  const response = await api.get(`type/${type}`);
  return response.data.pokemon.map((p: { pokemon: { name: string; url: string } }) => p.pokemon) as { name: string; url: string }[];
};
