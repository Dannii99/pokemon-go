import { getTypeColor } from "@/utils/colors";
import { Search } from "lucide-react";

interface Props {
  types: string[];
  onFilter: (type: string) => void;
  onSearch: (query: string) => void;
}

export const PokemonFilter = ({ types, onFilter, onSearch }: Props) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="size-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Busca tu Pokémon..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-lg placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => onFilter("all")}
          className="px-6 py-2 rounded-full glass hover:bg-white/10 transition-colors text-sm font-bold uppercase tracking-widest border border-white/20"
        >
          Todos
        </button>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onFilter(type)}
            className="group px-6 py-2 rounded-full transition-all text-sm font-bold uppercase tracking-widest border border-transparent hover:border-white/40 overflow-hidden relative"
            style={{ backgroundColor: `${getTypeColor(type)}33` }}
          >
            <span className="relative z-10 text-white group-hover:text-white transition-colors">
              {type}
            </span>
            <div 
               className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style={{ backgroundColor: getTypeColor(type) }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PokemonFilter;
