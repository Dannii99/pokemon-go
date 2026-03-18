import {
  getDetailedPokemons,
  getPokemonTypes,
  getAllPokemonSpecies,
  getPokemonsByType,
  getGeneration,
} from "@/features/pokemon/services";
import { PokemonCard, PokedexHeader, PokedexSidebar } from "@/features/pokemon/components";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, X, Hash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { EmptyState, ErrorState } from "@/components/ui/status";

export default function Pokedex() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const selectedType = searchParams.get("type") || "all";
  const selectedGen = searchParams.get("gen") || "all";
  const searchQuery = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  
  const limit = 20;
  const offset = (page - 1) * limit;

  // Local state for pagination input to avoid jumping while typing
  const [pageInput, setPageInput] = useState(page.toString());

  useEffect(() => {
    setPageInput(page.toString());
  }, [page]);

  // 1. Fetch Types
  const { data: rawTypes = [], isError: isErrorTypes } = useQuery({
    queryKey: ["pokemon-types"],
    queryFn: getPokemonTypes,
  });
  const types = useMemo(() => rawTypes.map((t: { name: string }) => t.name), [rawTypes]);

  // 2. Fetch Full Species List (Source of truth for "Todas")
  const { data: allSpecies = [], isError: isErrorSpecies } = useQuery({
    queryKey: ["pokemon-all-species"],
    queryFn: getAllPokemonSpecies,
  });

  // 3. Fetch Generation Details if selected
  const { data: genDetails, isError: isErrorGen } = useQuery({
    queryKey: ["gen-details", selectedGen],
    queryFn: () => getGeneration(selectedGen),
    enabled: selectedGen !== "all",
  });

  // 4. Fetch Type Data if selected
  const { data: typeSource = [], isError: isErrorTypeData } = useQuery({
    queryKey: ["type-source", selectedType],
    queryFn: () => getPokemonsByType(selectedType),
    enabled: selectedType !== "all",
  });

  // 5. Apply Filtering Logic (Data-driven)
  const filteredList = useMemo(() => {
    let list = allSpecies;

    if (selectedType !== "all") {
        const typeNames = new Set(typeSource.map(p => p.name));
        list = list.filter(s => typeNames.has(s.name));
    }

    if (selectedGen !== "all" && genDetails) {
        const genSpeciesNames = new Set(genDetails.pokemon_species.map((s: { name: string }) => s.name));
        list = list.filter(s => genSpeciesNames.has(s.name));
    }

    if (searchQuery) {
      const normalized = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(normalized));
    }

    return list;
  }, [allSpecies, selectedType, typeSource, selectedGen, genDetails, searchQuery]);

  const totalPages = Math.ceil(filteredList.length / limit);

  // 6. Pagination
  const paginatedList = useMemo(() => {
    return filteredList.slice(offset, offset + limit);
  }, [filteredList, offset, limit]);

  // 7. Fetch Visible Details
  const { data: detailedPokemons = [], isLoading: isLoadingDetails, isError: isErrorDetails } = useQuery({
    queryKey: ["pokemon-details", paginatedList],
    queryFn: () => getDetailedPokemons(paginatedList),
    enabled: paginatedList.length > 0,
  });

  const isLoading = isLoadingDetails || (selectedType !== "all" && typeSource.length === 0 && !isErrorTypeData);
  const isError = isErrorTypes || isErrorSpecies || isErrorGen || isErrorTypeData || isErrorDetails;

  // Handlers
  const updateParams = (newParams: Record<string, string | number | undefined>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === "all" || value === "" || value === 1 || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, value.toString());
        }
      });
      return params;
    }, { replace: true });
  };

  const handleTypeSelect = (type: string) => {
    updateParams({ type, page: 1 });
  };

  const handleGenSelect = (genId: string) => {
    updateParams({ gen: genId, page: 1 });
  };

  const handleSearchChange = (value: string) => {
    updateParams({ search: value, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateParams({ page: newPage });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(pageInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      handlePageChange(p);
    } else {
      setPageInput(page.toString());
    }
  };

  // Helper for page numbers range
  const getPageNumbers = () => {
    const delta = 1;
    const range: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
            if (range.length > 0 && typeof range[range.length - 1] === "number" && i - (range[range.length - 1] as number) > 1) {
                range.push("...");
            }
            range.push(i);
        }
    }
    return range;
  };

  if (isError) {
    return (
      <main className="min-h-screen bg-background text-foreground pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-6">
          <ErrorState 
            title="Ocurrió un error al cargar los Pokémon"
            description="No pudimos conectar con la Pokédex. Por favor, intenta de nuevo más tarde."
            onRetry={() => window.location.reload()}
            retryLabel="Reintentar conexión"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-6">
        <PokedexHeader totalCount={filteredList.length} />

        <div className="flex flex-col md:flex-row gap-12">
          <PokedexSidebar 
            types={types}
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
            selectedGen={selectedGen}
            onGenSelect={handleGenSelect}
            totalSpeciesCount={allSpecies.length}
          />

          <div className="flex-1 space-y-8">
            <div className="relative group w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                placeholder="Busca por nombre..."
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white/5 border border-white/5 focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-lg placeholder:text-muted-foreground/20 text-white"
              />
              {searchQuery && (
                <button 
                  onClick={() => handleSearchChange("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  <X className="size-4 text-muted-foreground" />
                </button>
              )}
            </div>

            <div className="min-h-[600px]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[500px] gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">
                    Consultando Pokédex...
                  </span>
                </div>
              ) : filteredList.length === 0 ? (
                <EmptyState 
                  title="No se encontraron Pokémon con los filtros seleccionados"
                  description="Intenta cambiar los filtros o limpiar la búsqueda para encontrar lo que buscas."
                  onClear={() => updateParams({ type: "all", gen: "all", search: "", page: 1 })}
                  clearLabel="Limpiar filtros"
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-20 pt-10">
                  {detailedPokemons.map((p, index) => (
                    <PokemonCard key={p.id ?? `${p.name}-${index}`} pokemon={p} />
                  ))}
                </div>

              )}
            </div>

            {filteredList.length > limit && (
              <div className="flex flex-col items-center gap-8 mt-20 pt-10 border-t border-white/5">
                <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="h-11 px-4 rounded-xl glass hover:bg-primary/20 border-white/10 text-white disabled:opacity-30 group"
                  >
                    <ChevronLeft className="size-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Anterior</span>
                  </Button>
                  
                  <div className="hidden md:flex items-center gap-1 sm:gap-2">
                    {getPageNumbers().map((n, i) => (
                      typeof n === "number" ? (
                        <Button
                          key={i}
                          variant={page === n ? "default" : "outline"}
                          onClick={() => handlePageChange(n)}
                          className={`size-11 rounded-xl font-black text-xs ${
                            page === n 
                              ? "bg-primary text-black hover:bg-primary/90" 
                              : "glass border-white/10 text-white hover:bg-white/10"
                          }`}
                        >
                          {n}
                        </Button>
                      ) : (
                        <span key={i} className="text-muted-foreground/40 px-2 font-black">...</span>
                      )
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    className="h-11 px-4 rounded-xl glass hover:bg-primary/20 border-white/10 text-white disabled:opacity-30 group"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Siguiente</span>
                    <ChevronRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Total</span>
                      <div className="text-xs font-black text-white bg-white/5 px-4 py-1.5 rounded-lg border border-white/5">
                        {totalPages} <span className="text-muted-foreground/40 ml-1">Páginas</span>
                      </div>
                  </div>

                  <form onSubmit={handlePageInputSubmit} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Ir a</span>
                    <div className="relative group">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                      <input
                        type="text"
                        value={pageInput}
                        onChange={(e) => setPageInput(e.target.value)}
                        className="w-20 h-8 pl-8 pr-2 rounded-lg bg-white/5 border border-white/5 focus:border-primary/20 outline-none text-center text-xs font-black text-white transition-all"
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
