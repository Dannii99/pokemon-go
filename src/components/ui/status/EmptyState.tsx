import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title?: string;
  description?: string;
  onClear?: () => void;
  clearLabel?: string;
}

export const EmptyState = ({ 
  title = "No se encontraron resultados", 
  description = "Intenta cambiar los filtros o limpiar la búsqueda para encontrar lo que buscas.", 
  onClear,
  clearLabel = "Limpiar filtros"
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32 glass-dark rounded-[2.5rem] border border-white/5 w-full">
      <div className="bg-white/5 p-6 rounded-full">
        <Search className="size-12 text-muted-foreground/20" />
      </div>
      <div className="text-center space-y-2 px-6">
        <p className="text-2xl font-black uppercase tracking-tighter text-white">
            {title}
        </p>
        <p className="text-muted-foreground font-medium max-w-sm mx-auto">
            {description}
        </p>
      </div>
      {onClear && (
        <Button 
          onClick={onClear} 
          variant="outline"
          className="rounded-xl font-black uppercase tracking-widest text-[10px] h-11 px-8 hover:bg-primary/10 hover:text-primary border-white/10 transition-all"
        >
          {clearLabel}
        </Button>
      )}
    </div>
  );
};
