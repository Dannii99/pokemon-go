import { getTypeColor } from "@/utils/colors";
import { cn } from "@/lib/utils";
import { Check, Filter, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getGenerations, getGeneration } from "@/features/pokemon/services";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

// Helper to convert roman numerals to Gen numbers
const romanToGen: Record<string, string> = {
  "generation-i": "Gen I",
  "generation-ii": "Gen II",
  "generation-iii": "Gen III",
  "generation-iv": "Gen IV",
  "generation-v": "Gen V",
  "generation-vi": "Gen VI",
  "generation-vii": "Gen VII",
  "generation-viii": "Gen VIII",
  "generation-ix": "Gen IX",
};

interface Props {
  types: string[];
  selectedType: string;
  onTypeSelect: (type: string) => void;
  selectedGen: string;
  onGenSelect: (genId: string) => void;
  totalSpeciesCount: number;
  isFilterOpen?: boolean;
  onToggleFilter?: (open: boolean) => void;
}

export const PokedexSidebar = ({ 
  types, 
  selectedType, 
  onTypeSelect, 
  selectedGen, 
  onGenSelect,
  totalSpeciesCount,
  isFilterOpen = false,
  onToggleFilter
}: Props) => {

  // 1. Fetch all generation summaries
  const { data: gens = [] } = useQuery({
    queryKey: ["generations-list"],
    queryFn: getGenerations,
  });

  // 2. Fetch all generation details in parallel to get species counts
  const gensDetailsQueries = useQuery({
    queryKey: ["generations-details", gens],
    queryFn: async () => {
        const results = await Promise.all(
            gens.map(g => getGeneration(g.name))
        );
        return results;
    },
    enabled: gens.length > 0
  });

  const generations = useMemo(() => {
    const list = [
        { id: "all", name: "Todas", count: totalSpeciesCount }
    ];

    if (gensDetailsQueries.data) {
        gensDetailsQueries.data.forEach(g => {
            list.push({
                id: g.name,
                name: romanToGen[g.name] || g.name,
                count: g.pokemon_species.length
            });
        });
    }

    return list;
  }, [gensDetailsQueries.data, totalSpeciesCount]);

  const SidebarContent = () => (
    <>
      {/* Generations Section */}
      <div className="space-y-6">
        <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
          Generaciones
        </h3>
        <div className="flex flex-col gap-1">
          {gensDetailsQueries.isLoading ? (
            Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-12 w-full glass animate-pulse rounded-xl" />
            ))
          ) : (
            generations.map((gen) => (
                <button
                  key={gen.id}
                  onClick={() => { onGenSelect(gen.id); onToggleFilter?.(false); }}
                  className={cn(
                    "group flex items-center justify-between px-4 py-3 rounded-xl transition-all border",
                    selectedGen === gen.id 
                      ? "bg-primary/10 border-primary/30 text-white gold-glow" 
                      : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10 hover:text-white"
                  )}
                >
                  <span className="text-sm font-bold">{gen.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black opacity-40">{gen.count}</span>
                    {selectedGen === gen.id && <Check className="size-4 text-primary" />}
                  </div>
                </button>
              ))
          )}
        </div>
      </div>

      {/* Types Section */}
      <div className="space-y-6">
        <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
          Tipos
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => { onTypeSelect("all"); onToggleFilter?.(false); }}
            className={cn(
              "px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border text-center",
              selectedType === "all" 
                ? "bg-primary text-background border-primary gold-glow" 
                : "glass-dark hover:bg-white/10 text-muted-foreground border-white/10"
            )}
          >
            Todos
          </button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => { onTypeSelect(type); onToggleFilter?.(false); }}
              className={cn(
                "px-3 py-2.5 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border text-center relative overflow-hidden group/chip",
                selectedType === type 
                  ? "text-white border-white/40 gold-glow" 
                  : "text-muted-foreground border-white/5 hover:border-white/20"
              )}
              style={{ 
                backgroundColor: selectedType === type ? getTypeColor(type) : `${getTypeColor(type)}15` 
              }}
            >
              <span className="relative z-10">{type}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <div className="md:hidden flex items-center justify-between mb-4 px-1">
        <Button
          onClick={() => onToggleFilter?.(!isFilterOpen)}
          variant="outline"
          className="w-full h-12 rounded-xl glass border-white/10 flex items-center gap-3 font-black uppercase tracking-widest text-[10px]"
        >
          {isFilterOpen ? <X className="size-4" /> : <Filter className="size-4" />}
          {isFilterOpen ? "Cerrar Filtros" : "Mostrar Filtros"}
        </Button>
      </div>

      {/* Mobile Collapsible */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
        isFilterOpen ? "max-h-[2000px] opacity-100 mb-8" : "max-h-0 opacity-0"
      )}>
        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-10">
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col gap-10 sticky top-24">
        <SidebarContent />
      </aside>
    </>
  );
};
