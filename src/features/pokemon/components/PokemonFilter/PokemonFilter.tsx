import { getTypeColor } from "@/utils/colors";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  types: string[];
  onFilter: (type: string) => void;
  onSearch: (query: string) => void;
  selectedType: string;
}

export const PokemonFilter = ({ types, onFilter, onSearch, selectedType }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const displayedTypes = isExpanded ? types : types.slice(0, 5);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Search Bar - Enhanced for Dashboard */}
        <div className="relative w-full max-w-md group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
            <Search className="size-5 text-muted-foreground/60" />
          </div>
          <input
            type="text"
            placeholder="Busca tu Pokémon por nombre..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-6 rounded-xl bg-white/5 border border-white/10 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-base placeholder:text-muted-foreground/40"
          />
        </div>

        <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                Filtros por Tipo
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar md:pb-0 max-w-[46rem]">
                <button
                    onClick={() => onFilter("all")}
                    className={cn(
                        "px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap border border-white/10 shrink-0",
                        selectedType === "all" ? "bg-primary text-background border-primary" : "glass hover:bg-white/10 text-muted-foreground"
                    )}
                >
                    Todos
                </button>
                
                {displayedTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => onFilter(type)}
                        className={cn(
                            "px-5 py-2 rounded-full transition-all text-xs font-black uppercase tracking-wider border whitespace-nowrap shrink-0",
                            selectedType === type 
                                ? "text-white border-white/40" 
                                : "text-muted-foreground border-white/5 hover:border-white/20"
                        )}
                        style={{ 
                            backgroundColor: selectedType === type ? getTypeColor(type) : `${getTypeColor(type)}11` 
                        }}
                    >
                        {type}
                    </button>
                ))}

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="px-5 py-2 rounded-full glass hover:bg-white/10 text-muted-foreground text-xs font-black uppercase tracking-wider border border-white/10 flex items-center gap-2 shrink-0"
                >
                    {isExpanded ? (
                        <>Ver menos <ChevronUp className="size-3" /></>
                    ) : (
                        <>... Todos <ChevronDown className="size-3" /></>
                    )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonFilter;
