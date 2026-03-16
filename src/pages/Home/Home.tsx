import {
  getDetailedPokemons,
  getPokemonByName,
  getPokemonDescription,
  getPokemons,
  getPokemonTypes,
} from "@/features/pokemon/services";
import { PokemonCard, PokemonFilter } from "@/features/pokemon/components";
import type { Pokemon, PokemonDetail, PokemonList } from "@/features/pokemon/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

export default function Home() {
  const [pokemonBanner, setPokemonBanner] = useState<PokemonDetail | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filtered, setFiltered] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const limit = 21;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerData, bannerDesc, pokeData, pokeTypes] = await Promise.all([
          getPokemonByName("charizard"),
          getPokemonDescription("charizard"),
          getPokemons(limit, offset),
          getPokemonTypes(),
        ]);

        const { results: pokeList, next, previous } = pokeData;
        const fullList = await getDetailedPokemons(pokeList);

        setPokemonBanner({
          ...bannerData,
          description: bannerDesc,
        });

        setPokemons(fullList);
        setFiltered(fullList);
        setTypes(pokeTypes.map((t: { name: string }) => t.name));
        setNextUrl(next);
        setPrevUrl(previous);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [offset]);

  const handleFilter = (type: string) => {
    if (type === "all") return setFiltered(pokemons);
    setFiltered(pokemons.filter((p) => p.types.includes(type)));
  };

  const handleSearch = (query: string) => {
    const normalized = query.toLowerCase();
    setFiltered(
      pokemons.filter((p) => p.name.toLowerCase().includes(normalized))
    );
  };

  const handleNext = () => {
    if (nextUrl) {
      setOffset(offset + limit);
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (prevUrl && offset > 0) {
      setOffset(offset - limit);
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  if (!pokemonBanner) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-primary font-bold text-2xl tracking-tighter uppercase">
          Loading Pokédex...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Banner Section */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden px-6 pt-10 pb-20">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(247,207,43,0.1)_0%,rgba(24,23,17,1)_70%)]" />
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[60%] bg-primary/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
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
                Details <Zap className="ml-2 size-5 fill-current group-hover:animate-bounce" />
              </Button>
            </div>
          </div>

          {/* Hero Image */}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mt-24">
            {filtered.map((p, index) => (
              <PokemonCard key={p.id ?? `${p.name}-${index}`} pokemon={p} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-6 mt-20 pt-10 border-t border-white/5">
            <Button
              variant="outline"
              disabled={!prevUrl}
              onClick={handlePrev}
              className="h-12 w-12 rounded-full p-0 glass hover:bg-primary/20 border-white/10 text-white"
            >
              <ChevronLeft className="size-6" />
            </Button>
            
            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
               Page {Math.floor(offset / limit) + 1}
            </div>

            <Button
              variant="outline"
              disabled={!nextUrl}
              onClick={handleNext}
              className="h-12 w-12 rounded-full p-0 glass hover:bg-primary/20 border-white/10 text-white"
            >
              <ChevronRight className="size-6" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
