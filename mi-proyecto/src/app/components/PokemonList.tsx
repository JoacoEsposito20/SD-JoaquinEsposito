"use client";
import PokemonItem from "./PokemonItem";
import { useGetPokemonData } from "../hooks/UsePokemonAPI";
import { useState } from "react";

type Pokemon = {
  name: string,
  url: string;
}

const INITIAL_LIMIT = 20;
const LOAD_MORE_AMOUNT = 10;

export default function PokemonList(){ 
  const [limit, setLimit] = useState(INITIAL_LIMIT);
  const {data:pokemons, isLoading, isError} = useGetPokemonData(limit);

  const handleLoadMore = () =>{

    setLimit(prevLimit => prevLimit + LOAD_MORE_AMOUNT)
  }

  if (isError) return <p>Error al cargar pokemons</p>
  return(
    <div>
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
      {pokemons && pokemons.map((item:Pokemon) => (
        <li key={item.name}>
          <PokemonItem name={item.name}></PokemonItem>
        </li>
      ))}
      </ul>
      
      {/* **Botón "Cargar más"** */}
      <div className="flex justify-center mt-6 mb-8">
        <button
          onClick={handleLoadMore}
          disabled={isLoading} 
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:bg-gray-400 transition"
        >
          Cargar más
        </button>
      </div>

    </div>
    
  );

}