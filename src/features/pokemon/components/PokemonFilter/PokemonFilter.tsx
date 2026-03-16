import { getTypeColor } from "@/utils/colors";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  types: string[];
  onFilter: (type: string) => void;
  onSearch: (query: string) => void;
  selectedType: string;
  isHome?: boolean;
}

export const PokemonFilter = ({ types, onFilter, onSearch, selectedType, isHome = false }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show first 6 + "Todos" (all) = 7 items total when collapsed
  const displayedTypes = isExpanded ? types : types.slice(0, 6);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header with Search and Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="relative w-full max-w-xl group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
            <Search className="size-5 text-muted-foreground/60" />
          </div>
          <input
            type="text"
            placeholder={isHome ? "Busca un Pokémon para vista previa..." : "Busca tu Pokémon por nombre..."}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-6 rounded-xl bg-white/5 border border-white/10 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-base placeholder:text-muted-foreground/40 text-white"
          />
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-4 min-w-[200px]">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">
            Filtros por Tipo
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 transition-all hover:scale-105"
          >
            {isExpanded ? (
              <>Ver menos <ChevronUp className="size-3 group-hover:-translate-y-0.5 transition-transform" /></>
            ) : (
              <>Ver más <ChevronDown className="size-3 group-hover:translate-y-0.5 transition-transform" /></>
            )}
          </button>
        </div>
      </div>

      {/* Filter Chips - Grid/Wrap Layout (No Scroll) */}
      <div className={cn(
        "flex flex-wrap gap-3 transition-all duration-500 ease-in-out",
        isExpanded ? "max-h-[500px] opacity-100" : "max-h-[60px] overflow-hidden"
      )}>
        <button
          onClick={() => onFilter("all")}
          className={cn(
            "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border shrink-0",
            selectedType === "all" 
              ? "bg-primary text-background border-primary gold-glow" 
              : "glass hover:bg-white/10 text-muted-foreground border-white/10"
          )}
        >
          Todos
        </button>
        
        {displayedTypes.map((type) => (
          <button
            key={type}
            onClick={() => onFilter(type)}
            className={cn(
              "px-6 py-2.5 rounded-full transition-all text-xs font-black uppercase tracking-widest border shrink-0",
              selectedType === type 
                ? "text-white border-white/40 gold-glow" 
                : "text-muted-foreground border-white/5 hover:border-white/20"
            )}
            style={{ 
              backgroundColor: selectedType === type ? getTypeColor(type) : `${getTypeColor(type)}15` 
            }}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PokemonFilter;
