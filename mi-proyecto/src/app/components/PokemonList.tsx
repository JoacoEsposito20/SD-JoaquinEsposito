import PokemonItem from "./PokemonItem";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonIten from "./PokemonItem";

type abilities = {
  ability: {name:string, url:string},
  is_hidden:boolean,
  slot: 1
}

type stat = {
  base_stat: number,
  effort: number,
  stat: {name:string, url:string}
}

type pokemon = {
  name: string,
  abilities: abilities[],
  stats: stat[],
  sprite: string;
}

function procesarDatos(datos:any):pokemon{
  
  const nuevoPokemon:pokemon = {
    name:datos.name, 
    abilities:datos.abilities,
    stats:datos.stats,
    sprite:datos.sprites.front_default
  }

  return nuevoPokemon;
}

export default function PokemonList(){
    const [pokemones, setPokemones] = useState<any>([]);

    useEffect(() => {
    const obtenerDatos = async () => {
      try {
        let listaURLs = []
        
        for(let i=1; i<=20; i++){
          listaURLs.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }

        const promesasDePeticion = listaURLs.map(url => axios.get(url));
        const respuestas = await Promise.all(promesasDePeticion);
        const datosPokemones = respuestas.map(respuestas => respuestas.data);
        
        
        const listaPokemones:pokemon[] = [];
        datosPokemones.forEach(n => {listaPokemones.push(procesarDatos(n))});

        setPokemones(listaPokemones);
        
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    obtenerDatos();
  }, []); 

  if(pokemones.length == 0){
    return(<div><p>Cargando...</p></div>);
  }

  return(
      <div>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {pokemones.map((item:pokemon, index:number) => (
          <li key={index}>
            <PokemonItem name={item.name} abilities={item.abilities} stats={item.stats} sprite={item.sprite}></PokemonItem>
          </li>
        ))}
        </ul>
      </div>  
  );
  
}