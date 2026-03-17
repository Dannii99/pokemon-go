export interface PokemonList {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[]; /* { type: { name: string } }[] | */
  url: string;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonSprites {
  other: {
    ["official-artwork"]: {
      front_default: string;
    };
  };
}

export interface PokemonDetail {
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  description?: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
}

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
}