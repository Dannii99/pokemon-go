import {
  getDetailedPokemons,
  getPokemonByName,
  getPokemonDescription,
  getPokemons,
  getPokemonTypes,
} from "@/api";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import PokemonFilter from "../../components/PokemonFilter/PokemonFilter";
import type { Pokemon, PokemonDetail, PokemonList } from "@/models";
import { useEffect, useState } from "react";

export default function Home() {
  // ─── Estados ──────────────────────────────────────────────
  const [pokemonBanner, setPokemonBanner] = useState<PokemonDetail | null>(null);
  const [pokemonsList, setPokemonsList] = useState<PokemonList[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filtered, setFiltered] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const limit = 21;

  // ─── Efecto principal ─────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Peticiones paralelas
      const [bannerData, bannerDesc, pokeData, pokeTypes] = await Promise.all([
        getPokemonByName("charizard"),
        getPokemonDescription("charizard"),
        getPokemons(limit, offset),
        getPokemonTypes(),
      ]);

      // Extraemos las partes necesarias
      const { results: pokeList, next, previous } = pokeData;

      // 🔹 Obtenemos detalles de cada Pokémon
      const fullList = await getDetailedPokemons(pokeList);


        // ─── Banner ───────────────────────────────────────────
        setPokemonBanner({
          ...bannerData,
          description: bannerDesc,
        });

        // ─── Listas de pokemons ───────────────────────────────
        setPokemonsList(pokeList);
        setPokemons(fullList);
        setFiltered(fullList);

        console.log(pokeTypes);
        

        // ─── Tipos ────────────────────────────────────────────
        setTypes(pokeTypes.map((t: Pokemon) => t.name));

         // ─── URLs para paginación ─────────────────────────────
        setNextUrl(next);
        setPrevUrl(previous);
        
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, [offset]);

  // ─── Handlers ─────────────────────────────────────────────
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

  // ─── Handlers de paginación ───────────────────────────────
  const handleNext = () => {
    if (nextUrl) setOffset(offset + limit);
  };

  const handlePrev = () => {
    if (prevUrl && offset > 0) setOffset(offset - limit);
  };

  // ─── Render ───────────────────────────────────────────────
  if (!pokemonBanner) {
    return <p className="text-gray-500 mt-8 text-center">Cargando...</p>;
  }

  return (
    <>
      <section className="w-full h-[45rem] p-6 bg-amber-500 bg-[url('img/banner/bg-charizard.png')] bg-no-repeat bg-[position:center_bottom] bg-cover relative after:content-[''] after:w-full after:h-[60px] after:absolute after:left-0 after:bottom-[-31px] after:bg-[#242424] after:rounded-[50%_50%_0_0]">
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-[28rem] h-32 overflow-hidden">
            <img
              src="img/logo/pokemon.png"
              alt="pokemon"
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-8 ">
          <div className="col-start-1 flex justify-center items-center">
            <div className="md:w-3/5">
              <h1 className="text-6xl font-bold capitalize mb-4">
                {pokemonBanner.name}
              </h1>

              <div className="flex gap-3 mb-4">
                {pokemonBanner.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="bg-white/20 rounded-full px-3 py-1 text-sm font-semibold capitalize"
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>

              <p className="text-sm md:text-base lg:text-xl opacity-90 mb-6">
                {pokemonBanner.description}
              </p>

              <button className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-900 transition">
                Más detalles ⚡
              </button>
            </div>
          </div>

          <div className="col-start-2 flex flex-col justify-center items-center">
            <img
              src="img/pokemon/charizard.png"
              alt={pokemonBanner.name}
              className="scale-x-[-1] w-full max-w-[33rem]"
            />
            {/*  <img
            src={pokemonBanner.sprites.other["official-artwork"].front_default}
            alt={pokemonBanner.name}
            className="w-[30rem] object-contain drop-shadow-2xl"
          /> */}
            <span className="relative bottom-6 w-3/6 h-2 bg-black/40 blur-md rounded-full"></span>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[80rem] mx-auto">
        <div className="p-6">
          <PokemonFilter
            types={types}
            onFilter={handleFilter}
            onSearch={handleSearch}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 px-4 md:px-16 lg:px-24 xl:px-32">
            {filtered.map((p, index) => (
              <PokemonCard key={p.id ?? `${p.name}-${index}`} pokemon={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="p-6">
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={!prevUrl}
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
          >
            ← Anterior
          </button>
          <button
            disabled={!nextUrl}
            onClick={handleNext}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      </section>
    </>
  );
}
