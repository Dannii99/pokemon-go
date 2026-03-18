import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface Props {
  totalCount: number;
}

export const PokedexHeader = ({ totalCount }: Props) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-10">
      <div className="flex flex-col gap-2">
        <Link 
          to="/home" 
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group mb-2"
        >
          <div className="bg-white/5 p-1 rounded-md border border-white/5 group-hover:border-primary/20 transition-all">
            <ChevronLeft className="size-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Volver al Inicio</span>
        </Link>
        <div className="flex items-baseline gap-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white">Pokédex</h1>
          <span className="text-primary font-black uppercase tracking-widest text-[0.625rem] mdtext-xs bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
            {totalCount} Pokémon
          </span>
        </div>
      </div>
    </div>
  );
};
