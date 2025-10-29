"use client";
import PokemonItem from "./PokemonItem";
import axios from "axios";
import {useState, useEffect} from "react"; 

type pokemon = {
  name: string,
  url: string;
}

function procesarDatos(datos:any):pokemon{
  
  const nuevoPokemon:pokemon = {
    name:datos.name, 
    url:datos.url
  }

  return nuevoPokemon;
}
const limit = 30
const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;

export default function PokemonList(){
  const [pokemones, setPokemones] = useState<pokemon[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const obtenerPokemones = async () => {
      try {
        const respuestas = await axios.get(url);
        const resultadosAPI = respuestas.data.results;
        const pokemones:pokemon[] = resultadosAPI.map((n:pokemon) => n);
        setPokemones(pokemones);
        setCargando(false);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    }
    
    obtenerPokemones();
  },[]);

  if (cargando) return <p>Cargando pokemones...</p>;
  return(
    <div>
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
      {pokemones.map((item:pokemon) => (
        <li key={item.name}>
          <PokemonItem name={item.name}></PokemonItem>
        </li>
      ))}
      </ul>
    </div>  
  );

}