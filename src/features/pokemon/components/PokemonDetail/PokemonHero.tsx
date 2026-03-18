import { getTypeColor } from "@/utils/colors";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface Props {
  pokemon: any;
  species: any;
}

export const PokemonHero = ({ pokemon, species }: Props) => {
  const navigate = useNavigate();
  const primaryType = pokemon.types[0].type.name;
  const typeColor = getTypeColor(primaryType);
  const description = species.flavor_text_entries.find(
    (e: any) => e.language.name === "es"
  )?.flavor_text || species.flavor_text_entries.find(
    (e: any) => e.language.name === "en"
  )?.flavor_text;

  const handleBack = () => {
    // If there's history, go back to preserve state. 
    // Otherwise fallback to main pokedex.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/pokedex");
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[3rem] glass-dark border border-white/5 pb-12 lg:pb-0">
      {/* Background Atmosphere */}
      <div 
        className="absolute inset-0 opacity-20 blur-[100px] -z-10"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${typeColor}, transparent 70%)` 
        }}
      />
      
      <div className="max-w-7xl mx-auto px-8 py-10">
        <button 
          onClick={handleBack} 
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group"
        >
            <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Volver a la Pokédex</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
                <span className="text-primary font-black tracking-[0.3em] text-xl opacity-50 block">
                    #{String(pokemon.id).padStart(3, '0')}
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none">
                    {pokemon.name}
                </h1>
                <div className="flex flex-wrap gap-3 pt-2">
                    {pokemon.types.map((t: any) => (
                        <span
                            key={t.type.name}
                            className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white border border-white/10"
                            style={{ backgroundColor: `${getTypeColor(t.type.name)}80` }}
                        >
                            {t.type.name}
                        </span>
                    ))}
                </div>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-medium">
                {description?.replace(/\f/g, ' ')}
            </p>
          </div>

          <div className="order-1 lg:order-2 relative flex justify-center items-center group">
             <div 
                className="absolute inset-0 blur-[80px] opacity-30 rounded-full scale-75 animate-pulse" 
                style={{ backgroundColor: typeColor }}
             />
             <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="relative w-full max-w-lg object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
