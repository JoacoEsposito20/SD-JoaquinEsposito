"use client";
import PokemonItem from "./PokemonItem";
import { useGetPokemonData } from "../hooks/UsePokemonAPI";

type Pokemon = {
  name: string,
  url: string;
}

export default function PokemonList(){ 
  const {data:pokemones, isLoading, isError} = useGetPokemonData(30);

  if (isLoading) return <p>Cargando pokemones...</p>;
  if (isError) return <p>Error al cargar pokemons</p>
  return(
    <div>
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
      {pokemones && pokemones.map((item:Pokemon) => (
        <li key={item.name}>
          <PokemonItem name={item.name}></PokemonItem>
        </li>
      ))}
      </ul>
    </div>  
  );

}