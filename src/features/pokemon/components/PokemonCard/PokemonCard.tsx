import type { Pokemon } from "@/features/pokemon/types";
import { getTypeColor } from "@/utils/colors";
import { Button } from "@/components/ui/button";

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const primaryTypeColor = getTypeColor(pokemon.types[0]);

  return (
    <div 
      className="group relative flex flex-col items-center rounded-xl glass-dark p-5 pt-16 transition-all duration-300 hover:-translate-y-2 hover:gold-glow min-h-[18.75rem]"
      style={{
        background: `linear-gradient(180deg, rgba(26, 24, 16, 0.8) 0%, ${primaryTypeColor}22 100%)`
      }}
    >
      {/* Pokemon Image with Glow */}
      <div className="absolute top-[-50px] flex justify-center w-full transition-transform duration-500 group-hover:scale-110">
        <div 
          className="absolute inset-0 blur-3xl opacity-20 rounded-full"
          style={{ backgroundColor: primaryTypeColor }}
        />
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="relative h-40 w-40 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Info */}
      <div className="w-full text-center mt-auto">
        <h2 className="text-2xl font-bold capitalize text-white tracking-tight">
          {pokemon.name}
        </h2>
        
        {/* Types */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/10"
              style={{ backgroundColor: `${getTypeColor(type)}99` }}
            >
              {type}
            </span>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="flex justify-center gap-4 mt-4 text-xs font-medium text-gray-400">
          <span>{pokemon.height / 10} M</span>
          <span className="w-px h-3 bg-white/10" />
          <span>{pokemon.weight / 10} KG</span>
        </div>

        {/* Action */}
        <div className="mt-6">
          <Button 
            variant="default" 
            size="sm"
            className="w-full font-bold uppercase tracking-tighter hover:scale-105 transition-transform"
          >
            Detalles ⚡
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
