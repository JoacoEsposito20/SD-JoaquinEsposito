import { useState } from "react"

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
  sprite:string
}

export default function PokemonItem({name,abilities,stats,sprite}:pokemon,){
    const [cantidadClicks, sumarClicks] = useState<number>(0);

    const aumentarContador = () => {
        sumarClicks(cantidadClicks+1)
    }

    return(
        <main className="border p-2 rounded-lg shadow-md" onClick={aumentarContador} role = "button" tabIndex={0}>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold font-sans">{name}</h1>
                <img src={sprite} alt={`Imagen de $nose`} className="icono" />
                <h2>Contador de uso: {cantidadClicks}</h2>
            </div>
            <div className="flex items-center grid grid-cols-1">
                <h1 className="font-bold underline italic" >Habilidades</h1>
                <ul>
                    {abilities.map((item:abilities, index:number) => (
                    <li key={index}>
                        <p>Nombre: {item.ability.name}</p>
                        <p>Esta oculta: {item.is_hidden ? "SI":"NO"}</p>
                        <p>Slot: {item.slot}</p>
                    </li>
                    ))}
                </ul>
            </div>
        </main>
        
    );
}