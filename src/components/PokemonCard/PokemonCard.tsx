import type { Pokemon } from "@/models";
import { getTypeColor } from "@/utils/colors";

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

  return (
    <>
    {  
      
      
      
      <div style={{
        background: `linear-gradient(360deg, ${getTypeColor(pokemon.types[0])} -50%, rgb(29 40 56 / 21%) 70%)`
      }}
    className="bg-[linear-gradient(360deg,{{getTypeColor(typeName)}}_-50%,rgb(29_40_56_/_21%)_63%)] rounded-2xl p-4 text-white shadow-lg flex flex-col items-center hover:scale-105 transition relative justify-end min-h-[19rem]">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="absolute top-[-50px] h-auto w-full max-w-42 object-contain mb-2"
        />
        <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {pokemon.types?.length ? (
            pokemon.types.map((t: string ) => {
              const typeName = typeof t === "string" ? t : t;
              const bgColor = getTypeColor(typeName);
              return (
                <span
                  key={typeName}
                  className="badge capitalize px-3 py-1 rounded-full text-black font-semibold text-xs sm:text-base"
                  style={{ backgroundColor: bgColor }}
                >
                  {typeName}
                </span>
              );
            })
          ) : (
            <span className="text-gray-400">Sin tipo</span>
          )}
        </div>
        <div className="mt-3 text-sm">
          <p>
            {pokemon.height / 10} m • {pokemon.weight / 10} kg
          </p>
        </div>
        <button className="text-xs ms:text-base lg:text-lg mt-3 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center gap-1">
          ⚡ Mais detalhes
        </button>
      </div>}
    </>
  );
};

export default PokemonCard;
