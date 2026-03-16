import {
  getDetailedPokemons,
  getPokemonTypes,
  getAllPokemons,
  getPokemonsByType,
} from "@/features/pokemon/services";
import { PokemonCard, PokemonFilter } from "@/features/pokemon/components";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Pokedex() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 21;

  const { data: rawTypes = [] } = useQuery({
    queryKey: ["pokemon-types"],
    queryFn: getPokemonTypes,
  });
  const types = useMemo(() => rawTypes.map((t: { name: string }) => t.name), [rawTypes]);

  const { data: sourceList = [], isLoading: isLoadingSource } = useQuery({
    queryKey: ["pokemon-source", selectedType],
    queryFn: () => selectedType === "all" ? getAllPokemons() : getPokemonsByType(selectedType),
  });

  const filteredList = useMemo(() => {
    let list = sourceList;
    if (searchQuery) {
      const normalized = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(normalized));
    }
    return list;
  }, [sourceList, searchQuery]);

  const paginatedList = useMemo(() => {
    return filteredList.slice(offset, offset + limit);
  }, [filteredList, offset, limit]);

  const { data: detailedPokemons = [], isLoading: isLoadingDetails } = useQuery({
    queryKey: ["pokemon-details", paginatedList],
    queryFn: () => getDetailedPokemons(paginatedList),
    enabled: paginatedList.length > 0,
  });

  const handleFilter = (type: string) => {
    setSelectedType(type);
    setOffset(0);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
      <section className="w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Pokédex</h1>
                <p className="text-muted-foreground text-lg">Explora la base de datos completa de Pokémon.</p>
            </div>

            <div className="glass-dark rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5">
                <PokemonFilter
                    types={types}
                    selectedType={selectedType}
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
        </div>
      </section>
    </main>
  );
}
