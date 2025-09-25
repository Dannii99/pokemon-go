import "./index.css";
import './main.scss' 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Favorites, Pokemons } from "@/pages";


function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/pokemon/:id" element={<Pokemons />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
