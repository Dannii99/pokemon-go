import {
  getDetailedPokemons,
  getPokemonByName,
  getPokemonDescription,
  getPokemonTypes,
  getAllPokemons,
  getPokemonsByType,
} from "@/features/pokemon/services";
import { PokemonCard, PokemonFilter } from "@/features/pokemon/components";
import type { PokemonDetail } from "@/features/pokemon/types";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // ─── Estado de UI ──────────────────────────────────────────
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 21;

  // ─── Data Fetching ────────────────────────────────────────
  
  // 1. Banner (Charizard)
  const { data: pokemonBanner } = useQuery({
    queryKey: ["pokemon-banner", "charizard"],
    queryFn: async () => {
      const [data, description] = await Promise.all([
        getPokemonByName("charizard"),
        getPokemonDescription("charizard"),
      ]);
      return { ...data, description } as PokemonDetail;
    }
  });

  // 2. Tipos
  const { data: rawTypes = [] } = useQuery({
    queryKey: ["pokemon-types"],
    queryFn: getPokemonTypes,
  });
  const types = useMemo(() => rawTypes.map((t: { name: string }) => t.name), [rawTypes]);

  // 3. Dataset Base (Todos los nombres o por tipo)
  const { data: sourceList = [], isLoading: isLoadingSource } = useQuery({
    queryKey: ["pokemon-source", selectedType],
    queryFn: () => selectedType === "all" ? getAllPokemons() : getPokemonsByType(selectedType),
  });

  // ─── Lógica de Filtrado (Local sobre el sourceList) ──────
  const filteredList = useMemo(() => {
    let list = sourceList;
    if (searchQuery) {
      const normalized = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(normalized));
    }
    return list;
  }, [sourceList, searchQuery]);

  // ─── Paginación sobre el resultado filtrado ─────────────
  const paginatedList = useMemo(() => {
    return filteredList.slice(offset, offset + limit);
  }, [filteredList, offset, limit]);

  // 4. Detalles de los Pokémon visibles
  const { data: detailedPokemons = [], isLoading: isLoadingDetails } = useQuery({
    queryKey: ["pokemon-details", paginatedList],
    queryFn: () => getDetailedPokemons(paginatedList),
    enabled: paginatedList.length > 0,
  });

  // ─── Handlers ─────────────────────────────────────────────
  const handleFilter = (type: string) => {
    setSelectedType(type);
    setOffset(0); // Reset a primera página
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setOffset(0); // Reset a primera página
  };

  const handleNext = () => {
    if (offset + limit < filteredList.length) {
      setOffset(offset + limit);
      window.scrollTo({ top: 600, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (offset > 0) {
      setOffset(offset - limit);
      window.scrollTo({ top: 600, behavior: "smooth" });
    }
  };

  // ─── Render ───────────────────────────────────────────────
  if (!pokemonBanner) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-primary font-bold text-2xl tracking-tighter uppercase">
          Cargando Pokédex...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Banner Section */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden px-6 pt-10 pb-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(247,207,43,0.1)_0%,rgba(24,23,17,1)_70%)]" />
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[60%] bg-primary/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <img src="/img/logo/pokemon.png" alt="Pokemon" className="h-16 object-contain" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
                {pokemonBanner.name}
              </h1>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {pokemonBanner.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="px-4 py-1 rounded-full glass text-sm font-bold uppercase tracking-widest border border-primary/20 text-primary"
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              {pokemonBanner.description}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
              <Button size="lg" className="h-14 px-8 text-lg font-black uppercase tracking-tighter hover:scale-105 transition-transform group">
                Detalles <Zap className="ml-2 size-5 fill-current group-hover:animate-bounce" />
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center items-center group">
             <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75 animate-pulse" />
             <img
              src="/img/pokemon/charizard.png"
              alt={pokemonBanner.name}
              className="relative w-full max-w-lg object-contain drop-shadow-[0_20px_50px_rgba(247,207,43,0.3)] transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="glass-dark rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5">
          <PokemonFilter
            types={types}
            onFilter={handleFilter}
            onSearch={handleSearch}
          />
          
          <div className="min-h-[600px] mt-24">
            {isLoadingSource || isLoadingDetails ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredList.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <p className="text-2xl font-bold text-muted-foreground uppercase tracking-widest">
                  No se encontraron Pokémon
                </p>
                <Button onClick={() => { setSelectedType("all"); setSearchQuery(""); }} variant="outline">
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                {detailedPokemons.map((p, index) => (
                  <PokemonCard key={p.id ?? `${p.name}-${index}`} pokemon={p} />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredList.length > limit && (
            <div className="flex justify-center items-center gap-6 mt-20 pt-10 border-t border-white/5">
              <Button
                variant="outline"
                disabled={offset === 0}
                onClick={handlePrev}
                className="h-12 w-12 rounded-full p-0 glass hover:bg-primary/20 border-white/10 text-white disabled:opacity-30"
              >
                <ChevronLeft className="size-6" />
              </Button>
              
              <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                 Página {Math.floor(offset / limit) + 1} de {Math.ceil(filteredList.length / limit)}
              </div>

              <Button
                variant="outline"
                disabled={offset + limit >= filteredList.length}
                onClick={handleNext}
                className="h-12 w-12 rounded-full p-0 glass hover:bg-primary/20 border-white/10 text-white disabled:opacity-30"
              >
                <ChevronRight className="size-6" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
