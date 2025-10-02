"use client";
import PokemonList from "./components/PokemonList";
import Selector from "./components/PokemonList"
import { config } from "process";

export default function Home() {

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="row-start-1 text-center">
        <h1 className="text-1xl font-bold font-sans">Actividad 4 - Sistemas Distribuidos</h1>
        <h1 className="text-3xl font-bold font-sans">Seleccione un Pokemon</h1>
      </header>
      <main>
        <PokemonList/>
      </main>
      <footer>
        <h2>API - "https://pokeapi.co/api/v2/pokemon/"</h2>
      </footer>
    </div>
  );
}
