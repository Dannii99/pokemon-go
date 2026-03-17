/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTypeColor } from "@/utils/colors";

interface Props {
  stats: any[];
  primaryType: string;
}

const statNames: Record<string, string> = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Atq. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidad",
};

export const PokemonStats = ({ stats, primaryType }: Props) => {
  const maxStatValue = 255;
  const typeColor = getTypeColor(primaryType);

  return (
    <div className="glass-dark rounded-[2rem] p-8 border border-white/5 space-y-8">
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
        Estadísticas Base
      </h3>
      
      <div className="space-y-6">
        {stats.map((s) => {
          const percentage = (s.base_stat / maxStatValue) * 100;
          return (
            <div key={s.stat.name} className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {statNames[s.stat.name] || s.stat.name}
                </span>
                <span className="text-sm font-black text-white">{s.base_stat}</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: typeColor,
                    boxShadow: `0 0 15px ${typeColor}40`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4">
        <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest opacity-50">
          Los valores mostrados son las estadísticas base de la especie.
        </p>
      </div>
    </div>
  );
};
