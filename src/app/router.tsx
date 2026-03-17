import { Routes, Route } from "react-router-dom";
import { Home, Favorites, PokemonDetail, Pokedex } from "@/pages";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokedex" element={<Pokedex />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
    </Routes>
  );
}
