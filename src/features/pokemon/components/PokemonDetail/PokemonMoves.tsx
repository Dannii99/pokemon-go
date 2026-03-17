/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  moves: any[];
}

export const PokemonMoves = ({ moves }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const displayedMoves = showAll ? moves : moves.slice(0, 12);

  return (
    <div className="glass-dark rounded-[2.5rem] p-10 border border-white/5 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
          Movimientos
        </h3>
        <span className="text-[10px] font-black bg-white/5 px-3 py-1 rounded-lg border border-white/5 text-muted-foreground">
            {moves.length} TOTAL
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayedMoves.map((m: any) => (
          <div 
            key={m.move.name}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center hover:bg-white/10 hover:text-white transition-colors cursor-default"
          >
            {m.move.name.replace('-', ' ')}
          </div>
        ))}
      </div>

      {moves.length > 12 && (
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(!showAll)}
            className="rounded-xl font-black uppercase tracking-widest text-[10px] h-10 px-8"
          >
            {showAll ? "Ver menos" : "Ver todos los movimientos"}
          </Button>
        </div>
      )}
    </div>
  );
};
