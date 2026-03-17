/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getPokemonById } from "@/features/pokemon/services";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  evolutionChain: any;
}

const EvolutionNode = ({ speciesName }: { speciesName: string }) => {
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ["pokemon-evo-node", speciesName],
    queryFn: () => getPokemonById(speciesName),
  });

  if (isLoading || !pokemon) return <div className="size-24 glass rounded-full animate-pulse" />;

  return (
    <Link 
        to={`/pokemon/${pokemon.id}`}
        className="flex flex-col items-center gap-3 group transition-transform hover:scale-110"
    >
      <div className="relative size-32 sm:size-40 flex items-center justify-center glass rounded-full border border-white/5 group-hover:border-primary/20 transition-colors">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={speciesName}
          className="size-24 sm:size-32 object-contain drop-shadow-md group-hover:drop-shadow-glow transition-all"
        />
      </div>
      <span className="text-sm font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
        {speciesName}
      </span>
    </Link>
  );
};

export const PokemonEvolution = ({ evolutionChain }: Props) => {
  const getEvolutions = (chain: any) => {
    const evolutions = [];
    let current = chain;

    while (current) {
      evolutions.push(current.species.name);
      current = current.evolves_to[0];
    }
    return evolutions;
  };

  const evoNames = getEvolutions(evolutionChain.chain);

  return (
    <div className="glass-dark rounded-[2.5rem] p-10 border border-white/5 space-y-12">
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60 text-center">
        Línea Evolutiva
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-12">
        {evoNames.map((name, index) => (
          <div key={name} className="flex flex-col md:flex-row items-center gap-8 md:gap-4 lg:gap-12">
            <EvolutionNode speciesName={name} />
            {index < evoNames.length - 1 && (
              <div className="rotate-90 md:rotate-0 bg-white/5 p-3 rounded-full border border-white/5">
                <ChevronRight className="size-6 text-muted-foreground opacity-30" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
