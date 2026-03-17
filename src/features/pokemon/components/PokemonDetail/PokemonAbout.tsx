/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  pokemon: any;
  species: any;
}

export const PokemonAbout = ({ pokemon, species }: Props) => {
  const infoItems = [
    { label: "Altura", value: `${pokemon.height / 10} m` },
    { label: "Peso", value: `${pokemon.weight / 10} kg` },
    { label: "Exp. Base", value: `${pokemon.base_experience} XP` },
    { label: "Hábitat", value: species.habitat?.name || "Desconocido", capitalize: true },
    { label: "Generación", value: species.generation.name.split('-')[1].toUpperCase() },
    { label: "Felicidad", value: species.base_happiness },
    { label: "Ratio Captura", value: species.capture_rate },
    { label: "Crecimiento", value: species.growth_rate.name, capitalize: true },
  ];

  return (
    <div className="glass-dark rounded-[2rem] p-8 border border-white/5 h-full space-y-8">
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
        Información de Perfil
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-y-8 gap-x-4">
        {infoItems.map((item) => (
          <div key={item.label} className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
              {item.label}
            </span>
            <p className={`text-lg font-bold text-white ${item.capitalize ? 'capitalize' : ''}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-4 space-y-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
          Habilidades
        </span>
        <div className="flex flex-wrap gap-2">
          {pokemon.abilities.map((a: any) => (
            <div 
              key={a.ability.name}
              className={`px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest ${
                a.is_hidden ? 'border-primary/20 bg-primary/5 text-primary' : 'border-white/10 bg-white/5 text-white'
              }`}
            >
              {a.ability.name.replace('-', ' ')}
              {a.is_hidden && <span className="ml-2 opacity-50 text-[8px]">(Oculta)</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
