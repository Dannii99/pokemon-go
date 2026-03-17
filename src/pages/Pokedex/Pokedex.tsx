import {
  getDetailedPokemons,
  getPokemonTypes,
  getAllPokemonSpecies,
  getPokemonsByType,
  getGeneration,
} from "@/features/pokemon/services";
import { PokemonCard, PokedexHeader, PokedexSidebar } from "@/features/pokemon/components";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export default function Pokedex() {
  const location = useLocation();
  const initialState = location.state as { search?: string; type?: string } | null;

  const [selectedType, setSelectedType] = useState(initialState?.type || "all");
  const [selectedGen, setSelectedGen] = useState("all");
  const [searchQuery, setSearchQuery] = useState(initialState?.search || "");
  const [offset, setOffset] = useState(0);
  const limit = 20;

  // 1. Fetch Types
  const { data: rawTypes = [] } = useQuery({
    queryKey: ["pokemon-types"],
    queryFn: getPokemonTypes,
  });
  const types = useMemo(() => rawTypes.map((t: { name: string }) => t.name), [rawTypes]);

  // 2. Fetch Full Species List (Source of truth for "Todas")
  const { data: allSpecies = [] } = useQuery({
    queryKey: ["pokemon-all-species"],
    queryFn: getAllPokemonSpecies,
  });

  // 3. Fetch Generation Details if selected
  const { data: genDetails } = useQuery({
    queryKey: ["gen-details", selectedGen],
    queryFn: () => getGeneration(selectedGen),
    enabled: selectedGen !== "all",
  });

  // 4. Fetch Type Data if selected
  const { data: typeSource = [] } = useQuery({
    queryKey: ["type-source", selectedType],
    queryFn: () => getPokemonsByType(selectedType),
    enabled: selectedType !== "all",
  });

  // 5. Apply Filtering Logic (Data-driven)
  const filteredList = useMemo(() => {
    // Start with the appropriate source base
    let list = allSpecies;

    // A. If type is selected, filter by type (PokéAPI type returns specific pokemons)
    if (selectedType !== "all") {
        const typeNames = new Set(typeSource.map(p => p.name));
        list = list.filter(s => typeNames.has(s.name));
    }

    // B. If generation is selected, filter by generation species
    if (selectedGen !== "all" && genDetails) {
        const genSpeciesNames = new Set(genDetails.pokemon_species.map((s: { name: string }) => s.name));
        list = list.filter(s => genSpeciesNames.has(s.name));
    }

    // C. Search name
    if (searchQuery) {
      const normalized = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(normalized));
    }

    return list;
  }, [allSpecies, selectedType, typeSource, selectedGen, genDetails, searchQuery]);

  // 6. Pagination
  const paginatedList = useMemo(() => {
    return filteredList.slice(offset, offset + limit);
  }, [filteredList, offset, limit]);

  // 7. Fetch Visible Details (Map species to pokemon)
  const { data: detailedPokemons = [], isLoading: isLoadingDetails } = useQuery({
    queryKey: ["pokemon-details", paginatedList],
    queryFn: () => getDetailedPokemons(paginatedList),
    enabled: paginatedList.length > 0,
  });

  const isLoading = isLoadingDetails || (selectedType !== "all" && typeSource.length === 0 && selectedType !== "all");

  // Handlers
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setOffset(0);
  };

  const handleGenSelect = (genId: string) => {
    setSelectedGen(genId);
    setOffset(0);
  };

  const handleNext = () => {
    if (offset + limit < filteredList.length) {
      setOffset(offset + limit);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (offset > 0) {
      setOffset(offset - limit);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-6">
        <PokedexHeader totalCount={filteredList.length} />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <PokedexSidebar 
            types={types}
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
            selectedGen={selectedGen}
            onGenSelect={handleGenSelect}
            totalSpeciesCount={allSpecies.length}
          />

          {/* Results Grid */}
          <div className="flex-1 space-y-8">
            {/* Search Input */}
            <div className="relative group w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                placeholder="Busca por nombre..."
                onChange={(e) => { setSearchQuery(e.target.value); setOffset(0); }}
                className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white/5 border border-white/5 focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-lg placeholder:text-muted-foreground/20 text-white"
              />
              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(""); setOffset(0); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  <X className="size-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="min-h-[600px]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[500px] gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">
                    Consultando Pokédex...
                  </span>
                </div>
              ) : filteredList.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-6 py-32 glass-dark rounded-[2.5rem] border border-white/5">
                  <div className="bg-white/5 p-6 rounded-full">
                    <Search className="size-12 text-muted-foreground/20" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-2xl font-black uppercase tracking-tighter text-white">No se encontraron Pokémon</p>
                    <p className="text-muted-foreground font-medium">Prueba a cambiar los filtros o la búsqueda.</p>
                  </div>
                  <Button 
                    onClick={() => { setSelectedType("all"); setSelectedGen("all"); setSearchQuery(""); setOffset(0); }} 
                    variant="outline"
                    className="rounded-xl font-black uppercase tracking-widest text-[10px]"
                  >
                    Limpiar todos los filtros
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-20 pt-10">
                  {detailedPokemons.map((p, index) => (
                    <PokemonCard key={p.id ?? `${p.name}-${index}`} pokemon={p} />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredList.length > limit && (
              <div className="flex justify-center items-center gap-8 mt-20 pt-10 border-t border-white/5">
                <Button
                  variant="outline"
                  disabled={offset === 0}
                  onClick={handlePrev}
                  className="h-14 px-8 rounded-2xl glass hover:bg-primary/20 border-white/10 text-white disabled:opacity-30 group"
                >
                  <ChevronLeft className="size-5 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                  <span className="text-xs font-black uppercase tracking-widest">Anterior</span>
                </Button>
                
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Página</span>
                    <div className="text-sm font-black text-white bg-white/5 px-4 py-1 rounded-lg border border-white/5">
                        {Math.floor(offset / limit) + 1} <span className="text-muted-foreground mx-1">/</span> {Math.ceil(filteredList.length / limit)}
                    </div>
                </div>

                <Button
                  variant="outline"
                  disabled={offset + limit >= filteredList.length}
                  onClick={handleNext}
                  className="h-14 px-8 rounded-2xl glass hover:bg-primary/20 border-white/10 text-white disabled:opacity-30 group"
                >
                  <span className="text-xs font-black uppercase tracking-widest">Siguiente</span>
                  <ChevronRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
