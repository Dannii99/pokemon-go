import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  getPokemonById, 
  getPokemonSpecies, 
  getEvolutionChain 
} from "@/features/pokemon/services";
import { 
  PokemonHero, 
  PokemonStats, 
  PokemonAbout, 
  PokemonEvolution, 
  PokemonMoves,
  PokemonTypeEffectiveness,
  PokemonSprites
} from "@/features/pokemon/components/PokemonDetail";

export default function PokemonDetail() {
  const { id } = useParams();

  // 1. Basic Pokemon Data
  const { data: pokemon, isLoading: isLoadingPokemon } = useQuery({
    queryKey: ["pokemon-detail", id],
    queryFn: () => getPokemonById(id!),
    enabled: !!id,
  });

  // 2. Species Data
  const { data: species, isLoading: isLoadingSpecies } = useQuery({
    queryKey: ["pokemon-species", id],
    queryFn: () => getPokemonSpecies(id!),
    enabled: !!id,
  });

  // 3. Evolution Chain
  const { data: evolutionChain, isLoading: isLoadingEvo } = useQuery({
    queryKey: ["pokemon-evolution", species?.evolution_chain.url],
    queryFn: () => getEvolutionChain(species.evolution_chain.url),
    enabled: !!species?.evolution_chain.url,
  });

  const isLoading = isLoadingPokemon || isLoadingSpecies || isLoadingEvo;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
            Accediendo a los archivos...
        </span>
      </div>
    );
  }

  if (!pokemon || !species) return null;

  return (
    <main className="min-h-screen bg-background text-foreground pb-32 pt-6 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Hero Section */}
        <PokemonHero pokemon={pokemon} species={species} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Stats */}
            <div className="lg:col-span-1">
                <PokemonStats stats={pokemon.stats} primaryType={pokemon.types[0].type.name} />
            </div>

            {/* Right Column: About + Effectiveness */}
            <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <PokemonAbout pokemon={pokemon} species={species} />
                    <PokemonSprites sprites={pokemon.sprites} />
                </div>
                <PokemonTypeEffectiveness types={pokemon.types} />
            </div>
        </div>

        {/* Evolution Chain Section */}
        {evolutionChain && <PokemonEvolution evolutionChain={evolutionChain} />}

        {/* Moves Section */}
        <PokemonMoves moves={pokemon.moves} />
      </div>
    </main>
  );
}
