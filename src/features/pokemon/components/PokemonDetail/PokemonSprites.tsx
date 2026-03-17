/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  sprites: any;
}

export const PokemonSprites = ({ sprites }: Props) => {
  const spriteList = [
    { label: "Frontal", url: sprites.front_default },
    { label: "Espalda", url: sprites.back_default },
    { label: "Shiny", url: sprites.front_shiny },
    { label: "Shiny Espalda", url: sprites.back_shiny },
  ].filter(s => s.url);

  return (
    <div className="glass-dark rounded-[2.5rem] p-10 border border-white/5 space-y-8 h-full">
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
        Variantes y Vistas
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {spriteList.map((sprite) => (
          <div key={sprite.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <img src={sprite.url} alt={sprite.label} className="size-20 object-contain drop-shadow-sm" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
              {sprite.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
