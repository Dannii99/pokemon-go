import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorState = ({ 
  title = "Ocurrió un error inesperado", 
  description = "No pudimos cargar la información en este momento. Por favor, intenta de nuevo más tarde.", 
  onRetry,
  retryLabel = "Reintentar conexión"
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32 glass-dark rounded-[2.5rem] border border-red-500/10 w-full">
      <div className="bg-red-500/5 p-6 rounded-full border border-red-500/10">
        <AlertTriangle className="size-12 text-red-500/40" />
      </div>
      <div className="text-center space-y-2 px-6">
        <p className="text-2xl font-black uppercase tracking-tighter text-white">
            {title}
        </p>
        <p className="text-muted-foreground font-medium max-w-sm mx-auto">
            {description}
        </p>
      </div>
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline"
          className="rounded-xl font-black uppercase tracking-widest text-[10px] h-11 px-8 hover:bg-red-500/10 hover:text-red-400 border-white/10 transition-all flex items-center gap-2"
        >
          <RefreshCw className="size-3" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
};
