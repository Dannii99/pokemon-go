import {
  getDetailedPokemons,
  getPokemonById,
  getPokemonDescription,
  getPokemonTypes,
  getPokemons,
  getAllPokemonSpecies,
  getPokemonsByType,
} from "@/features/pokemon/services";
import { PokemonCard, PokemonFilter } from "@/features/pokemon/components";
import type { PokemonDetail } from "@/features/pokemon/types";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, Swords, BarChart3, Github, Twitter, Instagram } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // 1. Banner (Charizard)
  const { data: pokemonBanner } = useQuery({
    queryKey: ["pokemon-banner", "charizard"],
    queryFn: async () => {
      const [data, description] = await Promise.all([
        getPokemonById("charizard"),
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

  // 3. Full List for Discovery Preview
  const { data: discoverySource = [] } = useQuery({
    queryKey: ["pokemon-discovery", selectedType],
    queryFn: () => selectedType === "all" ? getAllPokemonSpecies() : getPokemonsByType(selectedType),
    enabled: searchQuery.length > 0 || selectedType !== "all",
  });

  // 4. Standard Preview (First 6)
  const { data: standardPreviewSource = [] } = useQuery({
    queryKey: ["pokemon-standard-preview"],
    queryFn: () => getPokemons(6, 0),
    enabled: searchQuery.length === 0 && selectedType === "all",
  });

  // 5. Compute Active Preview List
  const activeSource = useMemo(() => {
    const isSearching = searchQuery.length > 0;
    const isFiltering = selectedType !== "all";

    if (isSearching || isFiltering) {
      let list = discoverySource;
      if (isSearching) {
        const normalized = searchQuery.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(normalized));
      }
      return list.slice(0, 4); // Limit to 4 for discovery preview
    }

    return standardPreviewSource.results || [];
  }, [discoverySource, standardPreviewSource, searchQuery, selectedType]);

  const { data: displayPokemons = [], isLoading: isLoadingPreview } = useQuery({
    queryKey: ["pokemon-home-display", activeSource],
    queryFn: () => getDetailedPokemons(activeSource),
    enabled: activeSource.length > 0,
  });

  const handleVerTodos = () => {
    navigate("/pokedex", { 
      state: { 
        search: searchQuery, 
        type: selectedType 
      } 
    });
  };

  if (!pokemonBanner) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-primary font-bold text-2xl tracking-tighter uppercase">
          Cargando Dashboard...
        </div>
      </div>
    );
  }

  const isDiscoveryMode = searchQuery.length > 0 || selectedType !== "all";

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Hero Banner Section */}
      <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden px-6 pt-10 pb-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(247,207,43,0.15)_0%,rgba(24,23,17,1)_80%)]" />
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[60%] bg-primary/20 blur-[120px] rounded-full" />
        
        <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start">
               <img src="/img/logo/pokemon.png" alt="Pokemon" className="h-20 object-contain drop-shadow-glow" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.8] drop-shadow-2xl">
                {pokemonBanner.name}
              </h1>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {pokemonBanner.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="px-6 py-1.5 rounded-full glass text-sm font-black uppercase tracking-[0.2em] border border-primary/30 text-primary"
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xl md:text-[1.375rem] text-muted-foreground/80 leading-tight max-w-xl mx-auto lg:mx-0 font-medium">
              Domina el campo de batalla con el poder legendario de {pokemonBanner.name}. Un icono de fuerza y fuego puro.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2">
              <Button 
                size="lg" 
                onClick={() => navigate(`/pokemon/${pokemonBanner.id}`)}
                className="h-16 px-10 text-xl font-black uppercase tracking-tighter hover:scale-105 transition-all group bg-primary text-background hover:gold-glow"
              >
                Explorar Pokémon <Zap className="ml-3 size-6 fill-current group-hover:animate-pulse" />
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center items-center group">
             <div className="absolute inset-0 bg-primary/30 blur-[120px] rounded-full scale-75 animate-pulse" />
             <img
              src="/img/pokemon/charizard.png"
              alt={pokemonBanner.name}
              className="relative w-full max-w-xl object-contain drop-shadow-[0_30px_60px_rgba(247,207,43,0.4)] transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-3"
            />
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="w-full max-w-7xl mx-auto px-6 -mt-20 relative z-20 space-y-24 pb-32">
        <div className="glass-dark rounded-[2.5rem] p-8 md:p-14 shadow-3xl border border-white/5 backdrop-blur-2xl">
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                        {isDiscoveryMode ? "Resultados sugeridos" : "Vista Previa Pokédex"}
                    </h2>
                    <p className="text-muted-foreground font-medium">
                        {isDiscoveryMode 
                          ? `Explorando ${selectedType !== 'all' ? `tipo ${selectedType}` : ''} ${searchQuery ? `"${searchQuery}"` : ''}` 
                          : "Descubre los ejemplares más recientes y destacados."}
                    </p>
                </div>
                <Button 
                    variant="link" 
                    onClick={handleVerTodos}
                    className={cn(
                        "font-black uppercase tracking-widest flex items-center gap-2 hover:no-underline transition-all",
                        isDiscoveryMode 
                          ? "bg-primary/20 text-primary px-6 py-3 rounded-2xl border border-primary/20 hover:bg-primary/30 scale-110 gold-glow" 
                          : "text-primary hover:opacity-80"
                    )}
                >
                    Ver todos {isDiscoveryMode && "los resultados"} <ArrowRight className="size-5" />
                </Button>
            </div>

            <button 
              className={cn("text-[10px] font-black uppercase tracking-widest text-primary/40 hover:text-primary transition-colors", !isDiscoveryMode && "hidden")}
              onClick={() => { setSearchQuery(""); setSelectedType("all"); }}
            >
              Limpiar filtros
            </button>

            <PokemonFilter
                types={types}
                selectedType={selectedType}
                isHome={true}
                onFilter={(type) => setSelectedType(type)}
                onSearch={(q) => setSearchQuery(q)}
            />
            
            <div className={cn(
                "grid gap-x-10 gap-y-24 mt-24",
                isDiscoveryMode ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            )}>
                {isLoadingPreview ? (
                    Array.from({ length: isDiscoveryMode ? 4 : 6 }).map((_, i) => (
                        <div key={i} className="h-64 rounded-3xl glass animate-pulse" />
                    ))
                ) : displayPokemons.length === 0 && isDiscoveryMode ? (
                    <div className="col-span-full py-20 text-center space-y-4">
                        <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">No se encontraron coincidencias para la vista previa</p>
                        <Button variant="outline" onClick={handleVerTodos}>Ir a búsqueda completa</Button>
                    </div>
                ) : (
                    displayPokemons.map((p, index) => (
                        <PokemonCard key={p.id ?? `${p.name}-${index}`} pokemon={p} />
                    ))
                )}
            </div>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-[2rem] glass-dark p-10 border border-white/5 hover:border-primary/20 transition-all duration-500 hover:gold-glow">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                    <Swords className="size-32 text-primary" />
                </div>
                <div className="relative z-10 space-y-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-primary/20">
                        <Swords className="size-8 text-primary" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Simulador de Batalla</h3>
                        <p className="text-muted-foreground text-lg leading-snug max-w-sm">
                            Compara equipos, prueba enfrentamientos y simula estrategias avanzadas para dominar la liga.
                        </p>
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary/60">
                        Próximamente
                    </span>
                </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] glass-dark p-10 border border-white/5 hover:border-primary/20 transition-all duration-500 hover:gold-glow">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                    <BarChart3 className="size-32 text-primary" />
                </div>
                <div className="relative z-10 space-y-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-primary/20">
                        <BarChart3 className="size-8 text-primary" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Análisis Avanzado</h3>
                        <p className="text-muted-foreground text-lg leading-snug max-w-sm">
                            Estadísticas profundas, desgloses de rendimiento y tendencias de tipos en tiempo real.
                        </p>
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary/60">
                        En desarrollo
                    </span>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black/40 border-t border-white/5 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
                <img src="/img/logo/pokemon.png" alt="Pokemon" className="h-10 object-contain opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                    © 2026 Pokémon Dash Explorer. All rights reserved.
                </p>
            </div>
            
            <div className="flex gap-8">
                <a href="#" className="text-muted-foreground/40 hover:text-primary transition-colors"><Twitter className="size-5" /></a>
                <a href="#" className="text-muted-foreground/40 hover:text-primary transition-colors"><Instagram className="size-5" /></a>
                <a href="#" className="text-muted-foreground/40 hover:text-primary transition-colors"><Github className="size-5" /></a>
            </div>

            <nav className="flex gap-6">
                <Link to="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-white transition-colors">Inicio</Link>
                <Link to="/pokedex" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-white transition-colors">Pokédex</Link>
                <Link to="/favorites" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-white transition-colors">Favoritos</Link>
            </nav>
        </div>
      </footer>
    </main>
  );
}
