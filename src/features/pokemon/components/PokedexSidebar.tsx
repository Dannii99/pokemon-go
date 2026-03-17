import { getTypeColor } from "@/utils/colors";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const GENERATIONS = [
  { id: "all", name: "Todas", offset: 0, limit: 1025, count: 1025 },
  { id: "gen1", name: "Gen I", offset: 0, limit: 151, count: 151 },
  { id: "gen2", name: "Gen II", offset: 151, limit: 100, count: 100 },
  { id: "gen3", name: "Gen III", offset: 251, limit: 135, count: 135 },
  { id: "gen4", name: "Gen IV", offset: 386, limit: 107, count: 107 },
  { id: "gen5", name: "Gen V", offset: 493, limit: 156, count: 156 },
  { id: "gen6", name: "Gen VI", offset: 649, limit: 72, count: 72 },
  { id: "gen7", name: "Gen VII", offset: 721, limit: 88, count: 88 },
  { id: "gen8", name: "Gen VIII", offset: 809, limit: 96, count: 96 },
  { id: "gen9", name: "Gen IX", offset: 905, limit: 120, count: 120 },
];

interface Props {
  types: string[];
  selectedType: string;
  onTypeSelect: (type: string) => void;
  selectedGen: string;
  onGenSelect: (genId: string) => void;
}

export const PokedexSidebar = ({ 
  types, 
  selectedType, 
  onTypeSelect, 
  selectedGen, 
  onGenSelect 
}: Props) => {
  return (
    <aside className="w-full lg:w-72 flex flex-col gap-10">
      {/* Generations Section */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
          Generaciones
        </h3>
        <div className="flex flex-col gap-1">
          {GENERATIONS.map((gen) => (
            <button
              key={gen.id}
              onClick={() => onGenSelect(gen.id)}
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
          ))}
        </div>
      </div>

      {/* Types Section */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
          Tipos
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onTypeSelect("all")}
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
              onClick={() => onTypeSelect(type)}
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
    </aside>
  );
};
