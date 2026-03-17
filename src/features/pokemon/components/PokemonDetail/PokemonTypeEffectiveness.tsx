/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getTypeData } from "@/features/pokemon/services";
import { getTypeColor } from "@/utils/colors";

interface Props {
  types: any[];
}

const TypeBadge = ({ typeName }: { typeName: string }) => (
  <span 
    className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white border border-white/10 shrink-0"
    style={{ backgroundColor: `${getTypeColor(typeName)}80` }}
  >
    {typeName}
  </span>
);

export const PokemonTypeEffectiveness = ({ types }: Props) => {
  const { data: typeRelations, isLoading } = useQuery({
    queryKey: ["pokemon-type-relations", types],
    queryFn: async () => {
      const relations = await Promise.all(
        types.map((t) => getTypeData(t.type.name))
      );
      
      const effectiveness: any = {
        weaknesses: new Set<string>(),
        resistances: new Set<string>(),
        immunities: new Set<string>(),
      };

      relations.forEach((rel) => {
        rel.damage_relations.double_damage_from.forEach((t: any) => effectiveness.weaknesses.add(t.name));
        rel.damage_relations.half_damage_from.forEach((t: any) => effectiveness.resistances.add(t.name));
        rel.damage_relations.no_damage_from.forEach((t: any) => effectiveness.immunities.add(t.name));
      });

      // Cleanup: if something is resistant but also weak (dual type), it can be complex, 
      // but for this UI we'll just show the unique lists
      return effectiveness;
    },
  });

  if (isLoading || !typeRelations) return <div className="h-40 glass animate-pulse rounded-[2rem]" />;

  return (
    <div className="glass-dark rounded-[2.5rem] p-10 border border-white/5 space-y-10">
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
        Efectividad en Combate
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-red-400 opacity-80">Debilidades (x2)</span>
          <div className="flex flex-wrap gap-2">
            {Array.from(typeRelations.weaknesses as Set<string>).map((t) => (
              <TypeBadge key={t} typeName={t} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-green-400 opacity-80">Resistencias (1/2)</span>
          <div className="flex flex-wrap gap-2">
            {Array.from(typeRelations.resistances as Set<string>).map((t) => (
              <TypeBadge key={t} typeName={t} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 opacity-80">Inmunidades (x0)</span>
          <div className="flex flex-wrap gap-2">
            {typeRelations.immunities.size > 0 ? (
                Array.from(typeRelations.immunities as Set<string>).map((t) => (
                    <TypeBadge key={t} typeName={t} />
                ))
            ) : (
                <span className="text-xs text-muted-foreground opacity-40">Ninguna</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
