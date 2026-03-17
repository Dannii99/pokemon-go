interface Props {
  message?: string;
  minHeight?: string;
}

export const LoadingState = ({ 
  message = "Sincronizando con la red Pokémon...", 
  minHeight = "500px" 
}: Props) => {
  return (
    <div 
      className="flex flex-col items-center justify-center gap-6 w-full"
      style={{ minHeight }}
    >
      <div className="relative">
        {/* Outer Ring */}
        <div className="size-16 rounded-full border-4 border-white/5 border-t-primary animate-spin" />
        {/* Inner Pulse */}
        <div className="absolute inset-0 size-8 bg-primary/20 rounded-full m-auto animate-pulse blur-xl" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
        {message}
      </span>
    </div>
  );
};
