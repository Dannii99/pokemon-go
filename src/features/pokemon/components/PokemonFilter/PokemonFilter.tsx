import { getTypeColor } from "@/utils/colors";

interface Props {
  types: string[];
  onFilter: (type: string) => void;
  onSearch: (query: string) => void;
}

export const PokemonFilter = ({ types, onFilter, onSearch }: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap gap-2 py-4">
        <button
          onClick={() => onFilter("all")}
          className="px-3 py-1 bg-gray-700 text-white rounded-full"
        >
          All
        </button>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onFilter(type)}
            className="px-3 py-1 rounded-full text-white capitalize cursor-pointer"
            style={{ backgroundColor: getTypeColor(type) }}
          >
            {type}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Encontre seu pokémon..."
        onChange={(e) => onSearch(e.target.value)}
        className="px-4 py-2 rounded-md bg-gray-800 text-white outline-none"
      />
    </div>
  );
};

export default PokemonFilter;